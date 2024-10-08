import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import Responsive from "./images/responsive.svg";
import Custom from "./images/customer.svg";
import Admin from "./images/admin.svg";
import Statistic from "./images/statistic.svg";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const onFinish = async (values) => {
    setLoad(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8", // Buradaki hatayı düzelttik
          },
          body: JSON.stringify(values), // body kısmını doğru konuma aldık
        }
      );

      // Eğer sunucu başarılı bir yanıt dönerse
      setLoad(false);
      if (response.ok) {
        message.success("Register Success");
        navigate("/login");
      } else {
        message.error("Register Failure");
      }
    } catch (error) {
      message.error("Bizden Kaynaklanan Sorun Var.");
    }
  };

  return (
    <main className="h-screen">
      <article className="flex justify-between h-full">
        <section className="left relative xl:w-2/6 w-full px-10 xl:px-20 flex min-w-[400px] flex-col h-full justify-center">
          <h1 className="text-center text-5xl font-bold mb-3">LOGO</h1>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Lütfen Kullanıcı Adı Giriniz!",
                },
              ]}
              label="Kullanıcı Adı"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Lütfen Email Giriniz!",
                },
              ]}
              label="Email"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Lütfen Şifrenizi Giriniz!",
                },
              ]}
              label="Şifre"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="r-password"
              dependencies={["password"]} // Burayı düzeltin
              rules={[
                {
                  required: true,
                  message: "Lütfen Tekrar Şifrenizi Giriniz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                  },
                }),
              ]}
              label="Tekrar Şifre"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                loading={load}
                className="w-full"
                size="large"
                htmlType="submit"
                type="primary"
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-10 bottom-10 ">
            Bir Hesabınız Mı Var?{" "}
            <span className="text-blue-700 ml-3">
              <Link to={"/login"}>Hemen Giriş Yap</Link>
            </span>
          </div>
        </section>
        <section className="right md:w-1/2  lg:flex  hidden items-center bg-[#6c63ff] min-w-[800px] xl:w-4/6 lg:w-3/5">
          <aside className="w-full  ">
            <Carousel autoplay>
              <div className="!flex flex-col p-5 items-center justify-center h-full mb-10">
                <img
                  className="w-[600px] h-[500px]"
                  src={Responsive}
                  alt="responsive"
                />
                <h3 className="text-center text-4xl text-white font-bold">
                  Responsive
                </h3>
                <p
                  className="mt-5 text-center text-white
                 text-4xl"
                >
                  Tüm Cihaz Boyutlarıyla Uyumluluk
                </p>
              </div>
              <div className="!flex flex-col p-5 items-center justify-center h-full mb-10">
                <img
                  className="w-[600px] h-[500px]"
                  src={Custom}
                  alt="responsive"
                />
                <h3 className="text-center text-4xl text-white font-bold">
                  Müşteri Hizmeti
                </h3>
                <p
                  className="mt-5 text-center text-white
                 text-4xl"
                >
                  Herkese Hizmet Etmek Bizim İşimiz
                </p>
              </div>
              <div className="!flex flex-col p-5 items-center justify-center h-full mb-10">
                <img
                  className="w-[60
                  0px] h-[500px]"
                  src={Admin}
                  alt="responsive"
                />
                <h3 className="text-center text-4xl text-white font-bold">
                  Admin Paneli
                </h3>
                <p
                  className="mt-5 text-center text-white
                 text-4xl"
                >
                  İstedğiniz Şekilde Ürünlerinizi Düzenleyin
                </p>
              </div>
              <div className="!flex flex-col p-5 items-center justify-center h-full mb-10">
                <img
                  className="w-[600px] h-[500px]"
                  src={Statistic}
                  alt="responsive"
                />
                <h3 className="text-center text-4xl text-white font-bold">
                  İstatistik
                </h3>
                <p
                  className="mt-5 text-center text-white
                 text-4xl"
                >
                  İstatistiklerle Daha İyi Bir Anlatım
                </p>
              </div>
            </Carousel>
          </aside>
        </section>
      </article>
    </main>
  );
};

export default RegisterPage;
