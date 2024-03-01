import {
  Layout,
  Image,
  Form,
  Radio,
  Input,
  Select,
  TreeSelect,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  Button,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Img from "../../../../assets/voi-nhung-cong-cu-rat-huu-ich-ban-da-co-the-in-truc-tiep-ngay-tren-google-map.jpg";
import { AimOutlined } from "@ant-design/icons";
import { useState } from "react";
import ClientHeader from "../../components/ClientHeader";
import ClientFooter from "../../components/ClientFooter";

type SizeType = Parameters<typeof Form>[0]["size"];

function ContactPage() {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <div>
      <Layout style={{ display: "flex" }}>
      <Content
        style={{
          margin: "24px 16px",
          padding: 36,
          minHeight: 280,
          width: "100%",
          display: "flex",
        }}
      >
        <div className="" style={{ width: "50%" }}>
          <h2>Thông tin và hoạt động</h2>
          <hr
            style={{
              backgroundColor: "red",
              height: 3,
              border: "none",
              width: 120,
              opacity: 1,
            }}
          />

          <p>
            Với FoodLove, bạn có thể khám phá một loạt các món ăn đa dạng và
            phong phú. Trang web tự hào được tập hợp những đầu bếp và nhà sản
            xuất đồ ăn hàng đầu, đảm bảo rằng bạn sẽ tìm thấy những món ăn tuyệt
            vời và độc đáo để thỏa mãn khẩu vị của mình. Từ món ăn truyền thống
            đến món ăn hiện đại, từ ẩm thực đường phố đến ẩm thực cao cấp,
            FoodLove sẽ mang đến cho bạn một hành trình ẩm thực tuyệt vời.
          </p>

          <p>
            Mua sắm trên FoodLove cực kỳ dễ dàng. Bạn có thể duyệt qua danh mục
            đồ ăn, tìm kiếm theo từ khóa hoặc theo danh mục cụ thể, và dễ dàng
            đặt hàng trực tuyến với chỉ vài cú nhấp chuột. FoodLove cam kết mang
            đến cho bạn trải nghiệm mua sắm trực tuyến an toàn và tiện lợi, với
            sự đảm bảo về chất lượng và sự tươi ngon của các sản phẩm được cung
            cấp.
          </p>

          <h5>Giờ Hoạt động của chúng tôi</h5>
          <p>T2-T6: 9h-20h</p>
          <p>T7- Chủ nhật: 8h-21h</p>
        </div>
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <Image
            style={{ width: "100%" }}
            width={550}
            src={Img}
            preview={false}
          />
          <div className="" style={{ display: "flex" }}>
            <AimOutlined
              style={{ color: "red", marginRight: "10px", fontSize: "x-large" }}
            />
            <p style={{ margin: "0", fontSize: "16px", fontWeight: 600 }}>
              6 P. Lê Văn Thiêm, Thanh Xuân Trung, Thanh Xuân, Hà Nội
            </p>
          </div>
          <a href="" style={{ marginTop: 10 }}>
            Bấm vào để xem vị trí cửa hàng
          </a>
        </div>
      </Content>

      <Content
        style={{
          minHeight: 280,
          width: "100%",
          display: "flex",
          backgroundColor: "#797979",
        }}
      >
        <div className="" style={{ width: "50%" }}>
          <div className="" style={{ margin: "20px 0 20px 40px" }}>
            <h4 style={{ color: "#fff" }}>Liên hệ với chúng tôi!</h4>

            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              initialValues={{ size: componentSize }}
              onValuesChange={onFormLayoutChange}
              size={componentSize as SizeType}
              style={{ maxWidth: 600 }}
            >
              <Form.Item>
                <Input placeholder="Tên của bạn" style={{ height: 40 }} />
              </Form.Item>
              <Form.Item>
                <Input placeholder="Email" style={{ height: 40 }} />
              </Form.Item>
              <Form.Item>
                <Input.TextArea
                  placeholder="Tin nhắn"
                  style={{ height: 100 }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    width: 120,
                    color: "#fff",
                    backgroundColor: "#FF0000",
                    border: "none",
                  }}
                >
                  Gửi phản hồi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div
          className=""
          style={{
            width: "50%",
          }}
        >
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: 30,
            }}
          >
            <p style={{ color: "#fff", width: 500, fontSize: "16px" }}>
              Đóng Góp Ý Kiến Với Chúng Tôi Một phần để dịch vụ của chúng tôi
              đến với các bạn tốt hơn Chúng tôi sẽ luôn tiếp nhận những ý kiến
              của các bạn Chân thành cảm ơn vì sự ủng hộ của các bạn.
              Đóng Góp Ý Kiến Với Chúng Tôi Một phần để dịch vụ của chúng tôi
              đến với các bạn tốt hơn Chúng tôi sẽ luôn tiếp nhận những ý kiến
              của các bạn Chân thành cảm ơn vì sự ủng hộ của các bạn.
              Đóng Góp Ý Kiến Với Chúng Tôi Một phần để dịch vụ của chúng tôi
              đến với các bạn tốt hơn Chúng tôi sẽ luôn tiếp nhận những ý kiến
              của các bạn Chân thành cảm ơn vì sự ủng hộ của các bạn.
            </p>
          </div>
        </div>
      </Content>
    </Layout>
      </div>
    </div>
    
  );
}

export default ContactPage;
