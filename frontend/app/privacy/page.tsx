// 1. import คอมโพเนนต์เข้ามา แล้วเปลี่ยนชื่อเป็น PrivacyComponent โดยใช้ "as"
import Privacy from "@/components/auth/Privacy";

// 2. สร้าง Page component ของคุณ (ใช้ชื่อ PrivacyPage ได้ตามปกติ)
const PrivacyPage = () => {
  return <Privacy />;
};

export default PrivacyPage;
