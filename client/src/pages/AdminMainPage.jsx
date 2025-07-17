import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminBottomNav from '../components/admin/AdminBottomNav';


function AdminMainPage() {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeader></AdminHeader>
      <div style={{ padding: '2rem' }}>
        <h2>👤 관리자 페이지</h2>
        <p>관리자 인증이 완료되었습니다.</p>

        <button
          style={{ marginRight: '1rem' }}
          onClick={() => navigate('/admin/upload')}
        >
          🎵 음원 업로드
        </button>

        <button onClick={() => navigate('/admin/files')}>
          📂 업로드된 파일 목록 보기
        </button>
      </div>
      <AdminBottomNav></AdminBottomNav>
    </>
  );
}

export default AdminMainPage;
