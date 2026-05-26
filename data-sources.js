/**
 * ============================================================
 * FILE DỮ LIỆU NGUỒN THAM KHẢO PHÁP LÝ
 * ============================================================
 * 
 * Hướng dẫn cập nhật:
 * - Mỗi nguồn dữ liệu là một object trong mảng LEGAL_SOURCES
 * - Để thêm nguồn mới, copy mẫu bên dưới và paste vào cuối mảng
 * - Đảm bảo có dấu phẩy (,) giữa các object
 * 
 * MẪU THÊM NGUỒN MỚI:
 * {
 *     id: "source_xxx",
 *     name: "Tên văn bản",
 *     date: "Ngày ban hành",
 *     category: "Loại văn bản (Thông tư / Nghị định / Luật / Công văn...)",
 *     content: `Nội dung đầy đủ của văn bản...`
 * }
 * ============================================================
 */

const LEGAL_SOURCES = [

    // ========== NGUỒN 1: BÁO CÁO TỔNG HỢP ==========
    {
        id: "source_baocao_tongquat",
        name: "Báo cáo chi tiết các điều khoản và quy định pháp luật theo nguồn tài liệu",
        date: "2025",
        category: "Báo cáo tổng hợp",
        content: `BÁO CÁO CHI TIẾT CÁC ĐIỀU KHOẢN VÀ QUY ĐỊNH PHÁP LUẬT THEO NGUỒN TÀI LIỆU

1. TỔNG QUAN VỀ HỆ THỐNG VĂN BẢN PHÁP LUẬT PHÂN TÍCH

Dựa trên nguồn tài liệu pháp quy được cung cấp, hệ thống văn bản và các căn cứ pháp lý liên quan được xác lập như sau:

* Thông tư số 19/2025/TT-BNNMT ngày 19 tháng 6 năm 2025 của Bộ Nông nghiệp và Môi trường: Hướng dẫn chức năng, nhiệm vụ, quyền hạn của cơ quan chuyên môn về Nông nghiệp và Môi trường thuộc Ủy ban nhân dân tỉnh, thành phố trực thuộc trung ương và Ủy ban nhân dân xã, phường, đặc khu thuộc tỉnh, thành phố trực thuộc trung ương.
* Công văn số 12942/SXD ngày 22 tháng 10 năm 2025 của Sở Xây dựng: Về việc hướng dẫn trình tự thực hiện quyết định giá bán nhà ở tái định cư tại địa bàn xã khác.
* Hệ thống căn cứ pháp lý trực tiếp (Trích dẫn nguyên văn từ Thông tư 19/2025/TT-BNNMT):
  * "Căn cứ Nghị định số 35/2025/NĐ-CP ngày 25 tháng 02 năm 2025 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Nông nghiệp và Môi trường;"
  * "Căn cứ Nghị định số 150/2025/NĐ-CP ngày 12 tháng 6 năm 2025 của Chính phủ quy định tổ chức các cơ quan chuyên môn thuộc Ủy ban nhân dân tỉnh, thành phố trực thuộc trung ương và Ủy ban nhân dân xã, phường, đặc khu thuộc tỉnh, thành phố trực thuộc trung ương;"

Mối quan hệ pháp lý: Thông tư 19/2025/TT-BNNMT đóng vai trò là văn bản hướng dẫn thi hành, cụ thể hóa các quy định về tổ chức bộ máy chuyên môn tại địa phương dựa trên khung quyền hạn mà Chính phủ đã giao cho Bộ Nông nghiệp và Môi trường và hệ thống chính quyền các cấp tại Nghị định 35/2025/NĐ-CP và Nghị định 150/2025/NĐ-CP.`
    },

    // ========== NGUỒN 2: THÔNG TƯ 19/2025 - SỞ CẤP TỈNH ==========
    {
        id: "source_tt19_so",
        name: "Thông tư 19/2025/TT-BNNMT - Quy định đối với Sở Nông nghiệp và Môi trường (Cấp tỉnh)",
        date: "19/06/2025",
        category: "Thông tư",
        content: `2. THÔNG TƯ 19/2025/TT-BNNMT: HƯỚNG DẪN CHỨC NĂNG, NHIỆM VỤ CỦA CƠ QUAN CHUYÊN MÔN NÔNG NGHIỆP VÀ MÔI TRƯỜNG

2.1. Quy định đối với Sở Nông nghiệp và Môi trường (Cấp tỉnh)

Vị trí và Chức năng (Điều 1): Sở Nông nghiệp và Môi trường là cơ quan chuyên môn thuộc UBND cấp tỉnh, thực hiện chức năng tham mưu, giúp UBND cấp tỉnh quản lý nhà nước về các lĩnh vực: nông nghiệp; lâm nghiệp; diêm nghiệp; thủy sản; thủy lợi; phòng, chống thiên tai; giảm nghèo; phát triển nông thôn; đất đai; tài nguyên nước; tài nguyên khoáng sản, địa chất; môi trường; khí tượng thủy văn; biến đổi khí hậu; đo đạc và bản đồ; quản lý tổng hợp tài nguyên và bảo vệ môi trường biển và hải đảo; viễn thám; quản lý nhà nước các dịch vụ công trong phạm vi quản lý.

Nhiệm vụ và Quyền hạn chung (Điều 2): Sở có trách nhiệm trình UBND cấp tỉnh dự thảo các nghị quyết của HĐND, quyết định của UBND về quy hoạch, kế hoạch phát triển ngành dài hạn và hàng năm; tổ chức thực hiện các văn bản quy phạm pháp luật, chiến lược, tiêu chuẩn và quy chuẩn kỹ thuật quốc gia sau khi được phê duyệt.

Nhiệm vụ cụ thể theo từng lĩnh vực chuyên ngành (Phân tích chi tiết Điều 2):

- Nông nghiệp: Tham mưu kế hoạch sản xuất, chuyển đổi cơ cấu cây trồng; quản lý giống, phân bón, thuốc bảo vệ thực vật; chỉ đạo phòng chống dịch hại; hướng dẫn sản xuất nông nghiệp tốt (GAP).
- Chăn nuôi & Thú y: Tham mưu quy định mật độ chăn nuôi, khu vực không được phép chăn nuôi; quản lý giết mổ, vệ sinh thú y; chỉ đạo phòng, chống dịch bệnh động vật trên cạn; quản lý thức ăn chăn nuôi.
- Lâm nghiệp: Tham mưu giao rừng, cho thuê rừng, chuyển mục đích sử dụng rừng; tổ chức phòng cháy và chữa cháy rừng; chi trả dịch vụ môi trường rừng; quản lý bảo tồn đa dạng sinh học trong rừng.
- Diêm nghiệp: Chỉ đạo, tổ chức sản xuất, chế biến và bảo quản muối; kiểm tra chất lượng, an toàn thực phẩm và môi trường của các cơ sở sản xuất muối.
- Thủy sản: Quản lý khai thác, nuôi trồng và bảo vệ nguồn lợi thủy sản; quản lý tàu cá, cảng cá; chống khai thác bất hợp pháp (IUU); quan trắc, cảnh báo môi trường vùng nuôi trồng.
- Thủy lợi: Quản lý khai thác và bảo vệ công trình thủy lợi, đập, hồ chứa nước; chủ trì định giá sản phẩm, dịch vụ công ích thủy lợi; quản lý cấp nước sạch nông thôn.
- Phòng, chống thiên tai: Xây dựng kế hoạch phòng, chống thiên tai, phương án hộ đê; quản lý lực lượng chuyên trách quản lý đê điều; thống kê thiệt hại và phục hồi sản xuất sau thiên tai.
- Phát triển nông thôn: Tham mưu chính sách kinh tế trang trại, hợp tác xã; xây dựng nông thôn mới; bảo tồn làng nghề truyền thống; đào tạo nghề nông nghiệp cho lao động nông thôn.
- Đất đai: Lập quy hoạch, kế hoạch sử dụng đất cấp tỉnh; thẩm định hồ sơ giao đất, cho thuê đất, thu hồi đất; đăng ký đất đai và cấp giấy chứng nhận; xây dựng cơ sở dữ liệu đất đai.
- Tài nguyên nước: Lập hành lang bảo vệ nguồn nước; cấp phép thăm dò, khai thác tài nguyên nước; điều hòa, phân phối tài nguyên nước; tổ chức ứng phó sự cố ô nhiễm nguồn nước.
- Địa chất & Khoáng sản: Đánh giá tiềm năng khoáng sản nhóm II, III, IV; lập kế hoạch đấu giá quyền khai thác khoáng sản; quản lý, bảo vệ tài nguyên khoáng sản chưa khai thác.
- Môi trường: Kiểm soát nguồn ô nhiễm, quản lý chất thải; quan trắc môi trường; thẩm định báo cáo đánh giá tác động môi trường (ĐTM); quản lý bùn nạo vét từ kênh mương.
- Khí tượng thủy văn: Cấp phép hoạt động dự báo, cảnh báo; giám sát tác động vào thời tiết; lập kế hoạch phát triển mạng lưới trạm quan trắc chuyên dùng.
- Biến đổi khí hậu: Xây dựng kế hoạch hành động ứng phó biến đổi khí hậu; kiểm kê khí nhà kính; theo dõi hoạt động kinh doanh tín chỉ các-bon tại địa phương.
- Đo đạc & Bản đồ: Xây dựng cơ sở dữ liệu đo đạc và bản đồ; sát hạch cấp chứng chỉ hành nghề hạng II; quản lý chất lượng sản phẩm đo đạc và bản đồ.
- Biển & Hải đảo: Quản lý tổng hợp tài nguyên vùng bờ; thiết lập hành lang bảo vệ bờ biển; thẩm định cấp phép nhận chìm ở biển (đối với tỉnh có biển).
- Viễn thám & Chuyển đổi số: Ứng dụng viễn thám trong giám sát tài nguyên; vận hành hạ tầng số, nền tảng số và cơ sở dữ liệu chuyên ngành; triển khai nông nghiệp thông minh.

Nhiệm vụ trọng tâm về Đất đai (Khoản 16, Điều 2): Sở có trách nhiệm tham mưu cho UBND cấp tỉnh về:
* Quy định hạn mức giao đất, công nhận quyền sử dụng đất, điều kiện và diện tích tách thửa tối thiểu.
* Chính sách đặc thù về bồi thường, hỗ trợ, tái định cư.
* Thẩm định quy hoạch, kế hoạch sử dụng đất do cấp dưới trình.
* Chủ trì việc tổ chức xây dựng, điều chỉnh, sửa đổi, bổ sung bảng giá đất.
* Chủ trì việc tổ chức xác định giá đất cụ thể làm căn cứ tính tiền sử dụng đất, thuê đất và tiền bồi thường khi Nhà nước thu hồi đất.`
    },

    // ========== NGUỒN 3: THÔNG TƯ 19/2025 - CẤP XÃ ==========
    {
        id: "source_tt19_xa",
        name: "Thông tư 19/2025/TT-BNNMT - Quy định đối với Cơ quan chuyên môn cấp xã",
        date: "19/06/2025",
        category: "Thông tư",
        content: `2.2. Quy định đối với Cơ quan chuyên môn cấp xã

Vị trí và Chức năng (Điều 3): Cơ quan này (Phòng Kinh tế hoặc Phòng Kinh tế, Hạ tầng và Đô thị) tham mưu cho UBND cấp xã thực hiện quản lý nhà nước về đất đai, tài nguyên, môi trường, nông nghiệp, phát triển nông thôn và phòng chống thiên tai tại địa bàn.

Nhiệm vụ và Quyền hạn cụ thể (Điều 4):
1. Tham mưu dự thảo các văn bản pháp quy, quy hoạch, kế hoạch phát triển nông nghiệp và môi trường hàng năm của xã.
2. Tổ chức thực hiện chiến lược, đề án, tiêu chuẩn kỹ thuật chuyên ngành và phổ biến pháp luật tại địa phương.
3. Tham mưu quản lý hoạt động trồng trọt, bảo vệ thực vật; huy động nguồn lực chống dịch và thực hiện chính sách hỗ trợ phục hồi sản xuất.
4. Tổ chức thực hiện kê khai hoạt động chăn nuôi, thống kê hộ chăn nuôi và cơ sở sản xuất thức ăn; giám sát dịch bệnh động vật trên cạn.
5. Tham mưu quản lý, bảo vệ rừng; phối hợp phòng cháy và chữa cháy rừng; xác nhận hồ sơ đề nghị giao rừng, thuê rừng.
6. Thực hiện biện pháp quản lý hoạt động thủy sản; tham mưu giao khu vực biển cho cá nhân chuyển đổi từ khai thác sang nuôi trồng.
7. Chỉ đạo hoạt động của tổ chức thủy lợi cơ sở; huy động nguồn lực địa phương xử lý sự cố công trình thủy lợi.
8. Tổ chức quản lý, bảo vệ, tu bổ đê điều; huy động lực lượng tuần tra canh gác và thực hiện phương châm "bốn tại chỗ" trong phòng chống thiên tai.
9. Lập quy hoạch sử dụng đất cấp xã; tham mưu quyết định bồi thường, hỗ trợ, tái định cư và giá đất cụ thể thuộc thẩm quyền.
10. Kiểm tra hồ sơ cấp giấy chứng nhận quyền sử dụng đất lần đầu; tham mưu việc cấp giấy chứng nhận cho các đối tượng tại địa bàn.
11. Theo dõi, phát hiện và tham gia giải quyết sự cố ô nhiễm nguồn nước; rà soát danh sách các công trình khai thác tài nguyên nước.
12. Tham mưu cấp giấy xác nhận đăng ký thu hồi khoáng sản; vận động nhân dân không khai thác khoáng sản trái phép.
13. Chỉ đạo, triển khai thực hiện các mô hình bảo vệ môi trường làng nghề; quản lý công tác thu gom và xử lý chất thải quy mô cấp xã.
14. Tham mưu yêu cầu bồi thường thiệt hại về môi trường gây ra trên địa bàn; đề nghị cấp tỉnh thẩm định dữ liệu xác định thiệt hại.
15. Phối hợp quản lý các hoạt động biển và hải đảo, bảo tồn đa dạng sinh học và an toàn thực phẩm nông sản, lâm sản, thủy sản, muối.`
    },

    // ========== NGUỒN 4: CÔNG VĂN SỞ XÂY DỰNG ==========
    {
        id: "source_cv12942_sxd",
        name: "Công văn 12942/SXD của Sở Xây dựng (22/10/2025)",
        date: "22/10/2025",
        category: "Công văn",
        content: `3. CÔNG VĂN 12942 CỦA SỞ XÂY DỰNG (22-10-2025)

Căn cứ trên tiêu đề văn bản được cung cấp, mục đích cốt lõi của công văn này là:
* Hướng dẫn trình tự thực hiện quyết định giá bán nhà ở tái định cư tại địa bàn xã khác.`
    },

    // ========== NGUỒN 5: VĂN BẢN LIÊN QUAN KHÁC ==========
    {
        id: "source_vanban_lienquan",
        name: "Các văn bản liên quan khác",
        date: "2024-2025",
        category: "Tham khảo",
        content: `4. CÁC VĂN BẢN LIÊN QUAN KHÁC

* Luật Đất đai 2024.
* Nghị định 151/2025/NĐ-CP.
* Nghị định 226/2025/NĐ-CP.

Thông báo về dữ liệu nguồn: Chi tiết các điều khoản cụ thể của 03 văn bản nêu trên không xuất hiện trong dữ liệu nguồn được cung cấp. LLM ghi nhận các văn bản này là các căn cứ pháp lý quan trọng có liên quan đến việc thực thi nhiệm vụ tại Thông tư 19/2025/TT-BNNMT nhưng không phân tích nội dung chi tiết.`
    },

    // ========== NGUỒN 6: PHÂN CẤP QUẢN LÝ ==========
    {
        id: "source_phancap",
        name: "Tổng kết và Phân cấp quản lý giữa cấp tỉnh và cấp xã",
        date: "2025",
        category: "Phân tích tổng hợp",
        content: `5. TỔNG KẾT VÀ PHÂN CẤP QUẢN LÝ

Bảng so sánh phân cấp trách nhiệm giữa cấp tỉnh và cấp xã trong 03 lĩnh vực then chốt:

LĨNH VỰC ĐẤT ĐAI:
- Vai trò của Sở (Cấp tỉnh): Thiết lập khung giá - Chủ trì xây dựng và điều chỉnh Bảng giá đất toàn tỉnh; thẩm định quy hoạch sử dụng đất cấp dưới.
- Vai trò của Cơ quan chuyên môn (Cấp xã): Thực thi giá cụ thể - Tham mưu quyết định giá đất cụ thể, giá bán nhà ở tái định cư; trực tiếp lập quy hoạch sử dụng đất cấp xã.

LĨNH VỰC MÔI TRƯỜNG:
- Vai trò của Sở (Cấp tỉnh): Quản lý vĩ mô - Quản lý mạng lưới quan trắc môi trường toàn tỉnh; thẩm định ĐTM dự án lớn; xây dựng kế hoạch quản lý không khí, nước mặt cấp tỉnh.
- Vai trò của Cơ quan chuyên môn (Cấp xã): Quản lý thực địa - Quản lý trực tiếp việc thu gom, xử lý chất thải quy mô xã; triển khai mô hình bảo vệ môi trường làng nghề; ứng phó sự cố môi trường cấp xã.

LĨNH VỰC NÔNG NGHIỆP:
- Vai trò của Sở (Cấp tỉnh): Quản lý tiêu chuẩn - Quản lý danh mục giống dự trữ, vật tư nông nghiệp; ban hành chính sách hỗ trợ nông nghiệp công nghệ cao; chỉ đạo chống dịch diện rộng.
- Vai trò của Cơ quan chuyên môn (Cấp xã): Quản lý thống kê - Trực tiếp kê khai, thống kê cơ sở chăn nuôi, hộ chăn nuôi; giám sát dịch bệnh tại chỗ; huy động lực lượng địa phương chống dịch hại.`
    },

    // ========== NGUỒN 7: LUẬT ĐẤT ĐAI 2024 ==========
    {
        id: "source_luat_datdai_2024",
        name: "Luật Đất đai 2024 (số 31/2024/QH15)",
        date: "2024",
        category: "Luật",
        content: `LUẬT ĐẤT ĐAI 2024 (SỐ 31/2024/QH15) VÀ CÁC LUẬT SỬA ĐỔI, BỔ SUNG LIÊN QUAN

1. QUYỀN HẠN CỦA NHÀ NƯỚC VÀ QUYỀN, NGHĨA VỤ CỦA CÔNG DÂN, NGƯỜI SỬ DỤNG ĐẤT

Quyền của Nhà nước: Đất đai thuộc sở hữu toàn dân do Nhà nước đại diện chủ sở hữu và thống nhất quản lý. Nhà nước có quyền quyết định quy hoạch, mục đích, hạn mức, thời hạn sử dụng đất, cũng như quyết định thu hồi, giao đất, cho thuê đất và định giá đất.

Quyền và nghĩa vụ của công dân: Công dân có quyền tiếp cận các thông tin đất đai (quy hoạch, kế hoạch sử dụng đất, bảng giá đất, phương án bồi thường, v.v.) và có nghĩa vụ chấp hành quy định pháp luật, bảo vệ và phát triển tài nguyên đất.

Quyền của người sử dụng đất: Người sử dụng đất được cấp Giấy chứng nhận, được hưởng thành quả lao động từ đất và được thực hiện các quyền: chuyển đổi, chuyển nhượng, cho thuê, cho thuê lại, thừa kế, tặng cho, thế chấp, góp vốn bằng quyền sử dụng đất. Người gốc Việt Nam định cư ở nước ngoài cũng được hưởng nhiều quyền lợi như nhận quyền sử dụng đất trong các dự án phát triển nhà ở hoặc được mua, thuê mua nhà ở gắn liền với quyền sử dụng đất ở.

2. QUY HOẠCH VÀ KẾ HOẠCH SỬ DỤNG ĐẤT

Hệ thống quy hoạch, kế hoạch sử dụng đất được phân cấp bao gồm: cấp quốc gia, cấp tỉnh, cấp huyện, quy hoạch đất quốc phòng và quy hoạch đất an ninh.

Thời kỳ quy hoạch: Thời kỳ quy hoạch sử dụng đất cấp huyện là 10 năm (tầm nhìn 20 năm); trong khi kế hoạch sử dụng đất cấp huyện được lập hằng năm. Việc lập quy hoạch phải bảo đảm dân chủ, công khai, minh bạch và có sự tham gia của các tổ chức chính trị - xã hội, cộng đồng, cá nhân.

3. THU HỒI ĐẤT VÀ TRƯNG DỤNG ĐẤT

Thu hồi đất: Nhà nước quyết định thu hồi đất trong các trường hợp:
- Vì mục đích quốc phòng, an ninh.
- Phát triển kinh tế - xã hội vì lợi ích quốc gia, công cộng.
- Do vi phạm pháp luật về đất đai (ví dụ: lấn chiếm đất, đất trồng cây hằng năm không sử dụng 12 tháng liên tục, chậm tiến độ dự án 24 tháng, v.v.).
- Do chấm dứt việc sử dụng đất theo pháp luật, tự nguyện trả lại đất, hoặc đất có nguy cơ đe dọa tính mạng con người (đất trong khu vực ô nhiễm độc hại, sạt lở, sụt lún).

Trưng dụng đất: Chỉ được áp dụng trong tình trạng thật cần thiết để thực hiện nhiệm vụ quốc phòng, an ninh hoặc trong tình trạng chiến tranh, khẩn cấp, phòng chống thiên tai.

4. BỒI THƯỜNG, HỖ TRỢ VÀ TÁI ĐỊNH CƯ

Nguyên tắc bồi thường: Phải bảo đảm dân chủ, khách quan, công bằng, công khai, kịp thời và đúng quy định pháp luật. Việc bồi thường được thực hiện bằng đất có cùng mục đích sử dụng, bằng tiền, hoặc bằng đất khác mục đích/nhà ở nếu địa phương có quỹ đất.

Bồi thường thiệt hại tài sản: Bồi thường theo giá trị xây dựng mới đối với nhà ở, công trình phục vụ sinh hoạt; bồi thường chi phí di chuyển tài sản và thiệt hại đối với cây trồng, vật nuôi.

Hỗ trợ: Người dân bị thu hồi đất được hưởng các khoản hỗ trợ ổn định đời sống, hỗ trợ ổn định sản xuất, kinh doanh, di dời vật nuôi, đào tạo, chuyển đổi nghề và tìm kiếm việc làm.

Tái định cư: Khu tái định cư phải đạt tiêu chuẩn nông thôn mới hoặc đô thị, ưu tiên vị trí thuận lợi và bố trí tại địa bàn cấp xã nơi có đất bị thu hồi trước.

5. GIAO ĐẤT, CHO THUÊ ĐẤT VÀ CHUYỂN MỤC ĐÍCH SỬ DỤNG ĐẤT

Căn cứ giao, cho thuê đất: Dựa trên kết quả trúng đấu giá quyền sử dụng đất, trúng đấu thầu lựa chọn nhà đầu tư, hoặc không thông qua đấu giá, đấu thầu (tùy từng trường hợp cụ thể).

Hình thức: Nhà nước giao đất không thu tiền sử dụng đất, giao đất có thu tiền sử dụng đất, hoặc cho thuê đất (trả tiền hằng năm hoặc trả tiền một lần cho cả thời gian thuê).

Chuyển mục đích sử dụng đất: Phải được cơ quan nhà nước có thẩm quyền cho phép đối với các trường hợp chuyển đất trồng lúa, đất rừng đặc dụng, rừng phòng hộ, rừng sản xuất sang mục đích khác; hoặc chuyển đất nông nghiệp sang phi nông nghiệp.

6. TÀI CHÍNH VỀ ĐẤT ĐAI VÀ GIÁ ĐẤT

Tài chính đất đai: Các khoản thu ngân sách từ đất đai bao gồm: tiền sử dụng đất, tiền thuê đất, tiền xử phạt vi phạm hành chính, tiền bồi thường cho Nhà nước, các loại thuế, phí và lệ phí.

Giá đất:
- Nguyên tắc định giá: Dựa trên phương pháp thị trường, tuân thủ đúng trình tự, bảo đảm tính độc lập, khách quan. Các phương pháp định giá bao gồm: so sánh, thu nhập, thặng dư và hệ số điều chỉnh giá đất.
- Bảng giá đất: Áp dụng để tính tiền sử dụng đất, tiền thuê đất, tính thuế, phí, lệ phí, tiền xử phạt vi phạm. Bảng giá đất được xây dựng theo khu vực, vị trí hoặc đến từng thửa đất nếu có cơ sở dữ liệu số hóa.
- Giá đất cụ thể: Được sử dụng để tính tiền bồi thường khi Nhà nước thu hồi đất và tính tiền sử dụng đất, tiền thuê đất cho một số dự án không qua đấu giá, đấu thầu.

7. ĐĂNG KÝ ĐẤT ĐAI VÀ CẤP GIẤY CHỨNG NHẬN (GCN)

Nhà nước cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất cho người có quyền sử dụng hợp pháp. Trường hợp thửa đất có nhiều người chung quyền sử dụng, Nhà nước sẽ cấp cho mỗi người 1 GCN hoặc cấp chung 1 GCN trao cho người đại diện nếu nhóm người sử dụng đất có yêu cầu.

8. CHẾ ĐỘ SỬ DỤNG ĐẤT

Thời hạn sử dụng đất: Chia làm 2 loại:
- Sử dụng ổn định lâu dài: đất ở, đất nông nghiệp do cộng đồng dân cư sử dụng, đất rừng phòng hộ, rừng đặc dụng, v.v.
- Sử dụng có thời hạn: đất giao, cho thuê cho tổ chức/cá nhân để sản xuất kinh doanh, thực hiện dự án thường không quá 50 năm, dự án đặc biệt có thể lên tới 70 năm.

Hạn mức: Quy định rõ hạn mức giao đất nông nghiệp cho cá nhân và hạn mức nhận chuyển quyền sử dụng đất nông nghiệp (không quá 15 lần hạn mức giao đất).

9. GIẢI QUYẾT TRANH CHẤP VÀ XỬ LÝ VI PHẠM

Nhà nước khuyến khích các bên tự hòa giải hoặc hòa giải tranh chấp đất đai ở cơ sở. Tùy thuộc vào việc có Giấy chứng nhận hay chưa, thẩm quyền giải quyết tranh chấp sẽ thuộc về Tòa án nhân dân hoặc Ủy ban nhân dân các cấp.

Luật quy định xử lý nghiêm minh mọi hành vi vi phạm pháp luật đất đai đối với cả người sử dụng đất lẫn cán bộ, công chức làm công tác quản lý nhà nước về đất đai nếu có hành vi lợi dụng chức vụ, thiếu trách nhiệm gây thiệt hại.`
    },

    // ========== THÊM NGUỒN MỚI TẠI ĐÂY ==========
    // Copy mẫu bên dưới, bỏ comment và điền nội dung:
    /*
    {
        id: "source_xxx",
        name: "Tên văn bản pháp luật",
        date: "DD/MM/YYYY",
        category: "Loại văn bản",
        content: `Nội dung đầy đủ của văn bản...`
    },
    */

];

/**
 * Hàm lấy toàn bộ nội dung nguồn dữ liệu đã ghép nối
 * Sử dụng trong app.js khi gọi Gemini API
 */
function getAllSourcesText() {
    return LEGAL_SOURCES.map(src => {
        return `--- ${src.name} (${src.category} - ${src.date}) ---\n${src.content}`;
    }).join('\n\n=====================================\n\n');
}

/**
 * Hàm lấy danh sách tên các nguồn dữ liệu
 */
function getSourcesList() {
    return LEGAL_SOURCES.map(src => ({
        id: src.id,
        name: src.name,
        date: src.date,
        category: src.category
    }));
}

/**
 * Hàm tìm kiếm nguồn theo từ khóa
 */
function searchSources(keyword) {
    const kw = keyword.toLowerCase();
    return LEGAL_SOURCES.filter(src =>
        src.name.toLowerCase().includes(kw) ||
        src.content.toLowerCase().includes(kw) ||
        src.category.toLowerCase().includes(kw)
    );
}
