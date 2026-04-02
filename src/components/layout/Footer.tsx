export default function Footer() {
  return (
    <footer style={{ marginTop: '4rem', background: '#111827', color: '#d1d5db' }}>
      <div className="container" style={{ padding: '2rem 0', lineHeight: 1.8 }}>
        <strong style={{ color: '#fff' }}>대한민국 복사난방의 기준, 썬레이텍</strong>
        <p style={{ margin: '0.4rem 0' }}>서울특별시 서초구 능안말길 40 2층 | 1688-2520</p>
        <small>© {new Date().getFullYear()} SUNRAYTEC Co., Ltd.</small>
      </div>
    </footer>
  );
}
