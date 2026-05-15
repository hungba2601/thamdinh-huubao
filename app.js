// pdf.js setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const state = {
    sourceFiles: [],
    projectFile: null,
    apiKey: localStorage.getItem('gemini_api_key') || '',
    modelName: 'gemini-3-flash-preview', // Sử dụng chính xác Gemini 3 Flash Preview
    isAnalyzing: false
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
    resultSection.scrollIntoView({ behavior: 'smooth' });
}
