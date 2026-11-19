// Nội dung động – thay "tone" bằng "img: '/images/ten-anh.webp'" khi có ảnh thật

export const slides = [
  { title: 'Khám sức khỏe tổng quát', text: 'Gói tầm soát toàn diện, có kết quả trong ngày – ưu đãi 30% cho khách đặt lịch online.', cta: 'Đặt lịch ngay', tone: 0 },
  { title: 'Đội ngũ bác sĩ đầu ngành', text: 'Hơn 20 bác sĩ chuyên khoa giàu kinh nghiệm, tận tâm với từng người bệnh.', cta: 'Gặp bác sĩ', tone: 1 },
  { title: 'Trang thiết bị hiện đại', text: 'Hệ thống chẩn đoán hình ảnh và xét nghiệm đạt chuẩn, chính xác – an toàn.', cta: 'Tìm hiểu thêm', tone: 2 },
];

export const specialties = [
  { icon: 'steth', name: 'Khám tổng quát', text: 'Kiểm tra sức khỏe định kỳ, phát hiện sớm bệnh lý.' },
  { icon: 'scalpel', name: 'Ngoại khoa', text: 'Tiểu phẫu, xử lý vết thương, bệnh lý ngoại khoa.' },
  { icon: 'lab', name: 'Cận lâm sàng', text: 'Xét nghiệm máu, nước tiểu, sinh hóa – trả kết quả nhanh.' },
  { icon: 'xray', name: 'Chẩn đoán hình ảnh', text: 'Siêu âm, X-quang kỹ thuật số, điện tim.' },
  { icon: 'shield', name: 'Thủ thuật vô trùng', text: 'Quy trình vô khuẩn nghiêm ngặt theo chuẩn Bộ Y tế.' },
  { icon: 'chat', name: 'Tư vấn sức khỏe', text: 'Bác sĩ tư vấn 1–1, theo dõi sau khám tận tình.' },
];

export const departments = ['Khám tổng quát', 'Nội khoa', 'Ngoại khoa', 'Sản phụ khoa', 'Cơ xương khớp', 'Phục hồi chức năng', 'Tầm soát sức khỏe toàn diện'];

export const stats = [
  { num: 15, suffix: '+', label: 'Năm kinh nghiệm' },
  { num: 20, suffix: '+', label: 'Bác sĩ chuyên khoa' },
  { num: 50000, suffix: '+', label: 'Lượt khám mỗi năm' },
  { num: 98, suffix: '%', label: 'Khách hàng hài lòng' },
];

// Thông tin bác sĩ mẫu – thay bằng hồ sơ thật
export const doctors = [
  { name: 'BS.CKII Nguyễn Văn A', role: 'Giám đốc chuyên môn – Nội khoa', tone: 0 },
  { name: 'ThS.BS Trần Thị B', role: 'Trưởng khoa Sản phụ khoa', tone: 1 },
  { name: 'BS.CKI Lê Văn C', role: 'Chuyên khoa Ngoại – Cơ xương khớp', tone: 2 },
  { name: 'BS Phạm Thị D', role: 'Chẩn đoán hình ảnh', tone: 3 },
];

export const facilities = [
  { name: 'Khu đón tiếp', tone: 0 }, { name: 'Phòng siêu âm 4D', tone: 1 }, { name: 'Máy X-quang kỹ thuật số', tone: 2 },
  { name: 'Phòng xét nghiệm', tone: 3 }, { name: 'Phòng tiểu phẫu', tone: 1 }, { name: 'Phòng lưu bệnh', tone: 0 },
];

export const partners = ['Bảo hiểm A', 'Bảo hiểm B', 'Ngân hàng C', 'Tập đoàn D', 'Công ty E', 'Bệnh viện F'];

export const press = [
  { source: 'Báo Sức khỏe', title: 'Phòng khám An Tâm – điểm đến tin cậy của người dân thành phố', tone: 1 },
  { source: 'Báo Đời sống', title: 'Mô hình khám sức khỏe tổng quát trả kết quả trong ngày', tone: 2 },
  { source: 'Tạp chí Y học', title: 'Ứng dụng chẩn đoán hình ảnh hiện đại tại phòng khám tư nhân', tone: 3 },
];

export const posts = [
  { date: '15/11/2026', title: 'Khi nào nên đi khám sức khỏe tổng quát?', text: 'Người trưởng thành nên kiểm tra sức khỏe tối thiểu 1 lần/năm để phát hiện sớm bệnh lý.', tone: 0 },
  { date: '10/11/2026', title: '5 dấu hiệu cảnh báo bệnh cơ xương khớp', text: 'Đau mỏi kéo dài, cứng khớp buổi sáng… là những tín hiệu không nên chủ quan.', tone: 1 },
  { date: '02/11/2026', title: 'Chăm sóc thai kỳ 3 tháng đầu', text: 'Những mốc khám thai quan trọng mẹ bầu cần ghi nhớ.', tone: 2 },
  { date: '25/10/2026', title: 'Phòng bệnh hô hấp khi trời chuyển lạnh', text: 'Giữ ấm, tiêm phòng cúm và tăng cường sức đề kháng cho cả gia đình.', tone: 3 },
];
