// pdf.js setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const state = {
    sourceFiles: [],
    projectFile: null,
    apiKey: localStorage.getItem('gemini_api_key') || '',
    modelName: 'gemini-3-flash-preview', // Sử dụng chính xác Gemini 3 Flash Preview
    isAnalyzing: false,
    lastResult: null // Lưu kết quả thẩm định gần nhất để xuất DOCX
};

// DOM Elements
const sourceDropZone = document.getElementById('source-drop-zone');
const sourceInput = document.getElementById('source-files');
const sourceFileList = document.getElementById('source-file-list');

const projectDropZone = document.getElementById('project-drop-zone');
const projectInput = document.getElementById('project-file');
const projectFileList = document.getElementById('project-file-list');

const homeBtn = document.getElementById('home-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const resultSection = document.getElementById('result-section');
const loadingSpinner = document.getElementById('loading-spinner');
const resultContent = document.getElementById('result-content');

const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const apiKeyInput = document.getElementById('api-key-input');
const saveSettings = document.getElementById('save-settings');
const closeModal = document.getElementById('close-modal');

const exportActions = document.getElementById('export-actions');
const exportDocxBtn = document.getElementById('export-docx-btn');

// --- Events ---

// Home Button (Reload/Reset)
homeBtn.onclick = () => {
    if (confirm("Bạn có muốn quay lại trang chủ và xóa các dữ liệu hiện tại không?")) {
        window.location.reload();
    }
};

// Source Upload
sourceDropZone.onclick = () => sourceInput.click();
sourceInput.onchange = (e) => handleSourceFiles(e.target.files);

sourceDropZone.ondragover = (e) => { e.preventDefault(); sourceDropZone.classList.add('dragover'); };
sourceDropZone.ondragleave = () => sourceDropZone.classList.remove('dragover');
sourceDropZone.ondrop = (e) => {
    e.preventDefault();
    sourceDropZone.classList.remove('dragover');
    handleSourceFiles(e.dataTransfer.files);
};

// Project Upload
projectDropZone.onclick = () => projectInput.click();
projectInput.onchange = (e) => handleProjectFile(e.target.files[0]);

projectDropZone.ondragover = (e) => { e.preventDefault(); projectDropZone.classList.add('dragover'); };
projectDropZone.ondragleave = () => projectDropZone.classList.remove('dragover');
projectDropZone.ondrop = (e) => {
    e.preventDefault();
    projectDropZone.classList.remove('dragover');
    handleProjectFile(e.dataTransfer.files[0]);
};

// Settings
settingsBtn.onclick = () => {
    apiKeyInput.value = state.apiKey;
    settingsModal.style.display = 'block';
};
closeModal.onclick = () => settingsModal.style.display = 'none';
saveSettings.onclick = () => {
    state.apiKey = apiKeyInput.value.trim();
    localStorage.setItem('gemini_api_key', state.apiKey);
    settingsModal.style.display = 'none';
    updateAnalyzeBtn();
};

// --- Handlers ---

function handleSourceFiles(files) {
    const pdfs = Array.from(files).filter(f => f.type === 'application/pdf');
    state.sourceFiles = [...state.sourceFiles, ...pdfs];
    renderFileList(sourceFileList, state.sourceFiles, (idx) => {
        state.sourceFiles.splice(idx, 1);
        handleSourceFiles([]); // re-render
    });
    updateAnalyzeBtn();
}

function handleProjectFile(file) {
    if (file && file.type === 'application/pdf') {
        state.projectFile = file;
        renderFileList(projectFileList, [file], () => {
            state.projectFile = null;
            renderFileList(projectFileList, [], null);
            updateAnalyzeBtn();
        });
    }
    updateAnalyzeBtn();
}

function renderFileList(container, files, onRemove) {
    container.innerHTML = '';
    files.forEach((file, idx) => {
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `
            <span>${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
            <span class="remove-file" data-idx="${idx}">✕</span>
        `;
        if (onRemove) {
            item.querySelector('.remove-file').onclick = () => onRemove(idx);
        }
        container.appendChild(item);
    });
}

function updateAnalyzeBtn() {
    analyzeBtn.disabled = !(state.sourceFiles.length > 0 && state.projectFile && state.apiKey);
    if (!state.apiKey) {
        analyzeBtn.title = "Vui lòng cấu hình API Key trong phần cài đặt";
    } else {
        analyzeBtn.title = "";
    }
}

// --- Logic ---

async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + "\n";
    }
    return text;
}

analyzeBtn.onclick = async () => {
    if (state.isAnalyzing) return;
    
    state.isAnalyzing = true;
    analyzeBtn.disabled = true;
    resultSection.style.display = 'block';
    loadingSpinner.style.display = 'block';
    resultContent.innerHTML = '';
    
    try {
        // 1. Extract text from all source files
        console.log("Extracting sources...");
        const sourceTexts = await Promise.all(state.sourceFiles.map(f => extractTextFromPDF(f)));
        const combinedSourceText = sourceTexts.join("\n\n--- FILE NGUỒN MỚI ---\n\n");
        
        // 2. Extract text from project file
        console.log("Extracting project...");
        const projectText = await extractTextFromPDF(state.projectFile);
        
        // 3. Call Gemini
        const result = await callGemini(combinedSourceText, projectText);
        
        // 4. Display result
        displayResult(result);
    } catch (error) {
        console.error(error);
        resultContent.innerHTML = `<div class="analysis-point" style="border-left-color: var(--danger)">
            <h4>Có lỗi xảy ra</h4>
            <p>${error.message}</p>
        </div>`;
    } finally {
        state.isAnalyzing = false;
        loadingSpinner.style.display = 'none';
        updateAnalyzeBtn();
    }
};

async function callGemini(sources, project) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${state.modelName}:generateContent?key=${state.apiKey}`;
    
    const prompt = `
BẠN LÀ CHUYÊN GIA THẨM ĐỊNH DỰ ÁN. 
DƯỚI ĐÂY LÀ CÁC VĂN BẢN QUY ĐỊNH (NGUỒN KIẾN THỨC):
${sources}

DƯỚI ĐÂY LÀ NỘI DUNG DỰ ÁN CẦN THẨM ĐỊNH:
${project}

NHIỆM VỤ:
1. Phân tích nội dung dự án đối chiếu với các quy định trong văn bản nguồn.
2. Đưa ra các nhận xét chi tiết (điểm nào đúng, điểm nào sai hoặc chưa phù hợp).
3. Đưa ra kết luận cuối cùng: "ĐỦ ĐIỀU KIỆN" hoặc "KHÔNG ĐỦ ĐIỀU KIỆN".

YÊU CẦU TRẢ VỀ ĐỊNH DẠNG JSON:
{
  "status": "SUCCESS" hoặc "FAILED",
  "points": [
    {"title": "Tiêu chí...", "content": "Nhận xét...", "isCorrect": true/false}
  ],
  "conclusion": "ĐỦ ĐIỀU KIỆN" hoặc "KHÔNG ĐỦ ĐIỀU KIỆN",
  "summary": "Tóm tắt ngắn gọn lý do..."
}
`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    const textResult = data.candidates[0].content.parts[0].text;
    return JSON.parse(textResult);
}

function displayResult(result) {
    const isSuccess = result.conclusion === "ĐỦ ĐIỀU KIỆN";
    
    // Lưu kết quả để xuất DOCX
    state.lastResult = result;
    
    let html = `
        <div class="result-badge ${isSuccess ? 'badge-success' : 'badge-error'}">
            ${result.conclusion}
        </div>
        <p style="margin-bottom: 1.5rem; font-weight: 500;">${result.summary}</p>
    `;
    
    result.points.forEach(pt => {
        html += `
            <div class="analysis-point" style="border-left-color: ${pt.isCorrect ? 'var(--accent)' : 'var(--danger)'}">
                <h4>${pt.isCorrect ? '✅' : '❌'} ${pt.title}</h4>
                <p>${pt.content}</p>
            </div>
        `;
    });
    
    resultContent.innerHTML = html;
    
    // Hiện nút xuất DOCX
    exportActions.style.display = 'flex';
    
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// --- Export DOCX ---

exportDocxBtn.onclick = async () => {
    if (!state.lastResult) return;
    
    exportDocxBtn.classList.add('exporting');
    exportDocxBtn.textContent = '⏳ Đang xuất...';
    
    try {
        await generateDocx(state.lastResult);
    } catch (err) {
        console.error('Export DOCX error:', err);
        alert('Có lỗi khi xuất file DOCX: ' + err.message);
    } finally {
        exportDocxBtn.classList.remove('exporting');
        exportDocxBtn.innerHTML = '📄 Xuất DOCX';
    }
};

async function generateDocx(result) {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, TableRow, TableCell, Table, WidthType, ShadingType } = docx;
    
    const isSuccess = result.conclusion === "ĐỦ ĐIỀU KIỆN";
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    
    // Tên dự án từ file đã tải
    const projectName = state.projectFile ? state.projectFile.name.replace('.pdf', '') : 'Dự án';
    
    // Tạo các sections cho từng điểm phân tích
    const analysisParagraphs = [];
    
    result.points.forEach((pt, idx) => {
        // Tiêu đề tiêu chí
        analysisParagraphs.push(
            new Paragraph({
                spacing: { before: 300, after: 100 },
                children: [
                    new TextRun({
                        text: `${pt.isCorrect ? '✔' : '✘'} ${idx + 1}. ${pt.title}`,
                        bold: true,
                        size: 24,
                        color: pt.isCorrect ? '065F46' : '991B1B',
                        font: 'Times New Roman',
                    }),
                ],
            })
        );
        
        // Nội dung nhận xét
        analysisParagraphs.push(
            new Paragraph({
                spacing: { after: 200 },
                indent: { left: 360 },
                children: [
                    new TextRun({
                        text: pt.content,
                        size: 24,
                        font: 'Times New Roman',
                    }),
                ],
            })
        );
        
        // Trạng thái
        analysisParagraphs.push(
            new Paragraph({
                spacing: { after: 200 },
                indent: { left: 360 },
                children: [
                    new TextRun({
                        text: 'Kết quả: ',
                        bold: true,
                        size: 24,
                        font: 'Times New Roman',
                    }),
                    new TextRun({
                        text: pt.isCorrect ? 'ĐẠT' : 'KHÔNG ĐẠT',
                        bold: true,
                        size: 24,
                        color: pt.isCorrect ? '065F46' : '991B1B',
                        font: 'Times New Roman',
                    }),
                ],
            })
        );
    });
    
    // Tạo bảng tổng hợp tiêu chí
    const summaryTableRows = [
        new TableRow({
            tableHeader: true,
            children: [
                new TableCell({
                    width: { size: 700, type: WidthType.DXA },
                    shading: { type: ShadingType.CLEAR, fill: '2563EB' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'STT', bold: true, color: 'FFFFFF', size: 22, font: 'Times New Roman' })] })],
                }),
                new TableCell({
                    width: { size: 5500, type: WidthType.DXA },
                    shading: { type: ShadingType.CLEAR, fill: '2563EB' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Tiêu chí', bold: true, color: 'FFFFFF', size: 22, font: 'Times New Roman' })] })],
                }),
                new TableCell({
                    width: { size: 2000, type: WidthType.DXA },
                    shading: { type: ShadingType.CLEAR, fill: '2563EB' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Kết quả', bold: true, color: 'FFFFFF', size: 22, font: 'Times New Roman' })] })],
                }),
            ],
        }),
    ];
    
    result.points.forEach((pt, idx) => {
        summaryTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${idx + 1}`, size: 22, font: 'Times New Roman' })] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: pt.title, size: 22, font: 'Times New Roman' })] })],
                    }),
                    new TableCell({
                        shading: { type: ShadingType.CLEAR, fill: pt.isCorrect ? 'D1FAE5' : 'FEE2E2' },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: pt.isCorrect ? 'ĐẠT' : 'KHÔNG ĐẠT', bold: true, size: 22, color: pt.isCorrect ? '065F46' : '991B1B', font: 'Times New Roman' })] })],
                    }),
                ],
            })
        );
    });
    
    const summaryTable = new Table({
        rows: summaryTableRows,
        width: { size: 100, type: WidthType.PERCENTAGE },
    });
    
    // Tạo document
    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: { font: 'Times New Roman', size: 24 },
                },
            },
        },
        sections: [{
            properties: {
                page: {
                    margin: { top: 1440, right: 1200, bottom: 1440, left: 1200 },
                },
            },
            children: [
                // Tiêu đề
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 },
                    children: [
                        new TextRun({
                            text: 'BÁO CÁO KẾT QUẢ THẨM ĐỊNH DỰ ÁN',
                            bold: true,
                            size: 36,
                            color: '0F172A',
                            font: 'Times New Roman',
                        }),
                    ],
                }),
                
                // Tên dự án
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 },
                    children: [
                        new TextRun({
                            text: projectName,
                            bold: true,
                            size: 28,
                            color: '2563EB',
                            font: 'Times New Roman',
                        }),
                    ],
                }),
                
                // Ngày thẩm định
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 },
                    children: [
                        new TextRun({
                            text: `Ngày thẩm định: ${dateStr}`,
                            italics: true,
                            size: 22,
                            color: '64748B',
                            font: 'Times New Roman',
                        }),
                    ],
                }),
                
                // Đường kẻ phân cách
                new Paragraph({
                    spacing: { after: 300 },
                    border: {
                        bottom: { style: BorderStyle.SINGLE, size: 6, color: '2563EB' },
                    },
                    children: [],
                }),
                
                // Kết luận
                new Paragraph({
                    spacing: { before: 200, after: 100 },
                    children: [
                        new TextRun({
                            text: 'KẾT LUẬN: ',
                            bold: true,
                            size: 28,
                            font: 'Times New Roman',
                        }),
                        new TextRun({
                            text: result.conclusion,
                            bold: true,
                            size: 28,
                            color: isSuccess ? '065F46' : '991B1B',
                            font: 'Times New Roman',
                        }),
                    ],
                }),
                
                // Tóm tắt
                new Paragraph({
                    spacing: { after: 400 },
                    children: [
                        new TextRun({
                            text: result.summary,
                            size: 24,
                            font: 'Times New Roman',
                        }),
                    ],
                }),
                
                // Phần I: Bảng tổng hợp
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 300, after: 200 },
                    children: [
                        new TextRun({
                            text: 'I. BẢNG TỔNG HỢP KẾT QUẢ',
                            bold: true,
                            size: 28,
                            color: '0F172A',
                            font: 'Times New Roman',
                        }),
                    ],
                }),
                
                summaryTable,
                
                // Phần II: Chi tiết
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 500, after: 200 },
                    children: [
                        new TextRun({
                            text: 'II. PHÂN TÍCH CHI TIẾT',
                            bold: true,
                            size: 28,
                            color: '0F172A',
                            font: 'Times New Roman',
                        }),
                    ],
                }),
                
                ...analysisParagraphs,
                
                // Đường kẻ cuối
                new Paragraph({
                    spacing: { before: 400, after: 200 },
                    border: {
                        bottom: { style: BorderStyle.SINGLE, size: 6, color: '2563EB' },
                    },
                    children: [],
                }),
                
                // Chân trang
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 200 },
                    children: [
                        new TextRun({
                            text: 'Được tạo bởi Hệ thống Thẩm định Dự án — ',
                            italics: true,
                            size: 20,
                            color: '94A3B8',
                            font: 'Times New Roman',
                        }),
                        new TextRun({
                            text: 'Made by Nguyễn Phi Hùng',
                            italics: true,
                            size: 20,
                            color: '94A3B8',
                            font: 'Times New Roman',
                        }),
                    ],
                }),
            ],
        }],
    });
    
    // Xuất file
    const blob = await Packer.toBlob(doc);
    const fileName = `KetQua_ThamDinh_${projectName}_${now.toISOString().slice(0, 10)}.docx`;
    saveAs(blob, fileName);
}
