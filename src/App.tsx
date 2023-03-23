import React, { useState } from "react";
import { Button, Segmented, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { DownloadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  // const [value, setValue] = useState<string | number>("9x13 cm");
  const [generated, setGenerated] = useState("");

  const { Title } = Typography;

  const props = {
    accept: ".png,.jpeg",
    beforeUpload: (file: File) => {
      setFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = 1360;
      canvas.height = 982;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        for (let i = 0; i < 10; i++) {
          const x = (i % 5) * 264;
          const y = Math.floor(i / 5) * 340;
          ctx.drawImage(img, x, y, 264, 340);
        }

        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = canvas.toDataURL("image/jpeg");
        document.body.appendChild(link);
        setGenerated(link.href);
      };
      return false;
    },
  };

  const handleDownload = () => {
    if (!file) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1360;
    canvas.height = 982;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      for (let i = 0; i < 10; i++) {
        const x = (i % 5) * 264;
        const y = Math.floor(i / 5) * 340;
        ctx.drawImage(img, x, y, 264, 340);
      }

      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = canvas.toDataURL("image/jpeg");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f5f5f5",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          background: "#f5f5f5",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 40,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div style={{ float: "left", width: "50%" }}>
          {/* <Segmented block options={["9x13 cm", "10x15 cm", "13x18 cm"]} value={value} onChange={setValue}/> */}
          <Title level={2}>
            Konwenter zdjęcie do dowodu/paszportu/legitymacji do wydrukowania w
            rossmanie
          </Title>

          <ImgCrop rotationSlider aspect={35 / 45}>
            <Dragger {...props} style={{ maxHeight: "300px" }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Kliknij lub przeciągnij plik do tego obszaru, aby przesłać
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </ImgCrop>
        </div>
        <div style={{ float: "left", width: "50%" }}>
          {file && (
            <div style={{ padding: 20 }}>
              <Title level={2}>
                Pammiętaj aby wydrukować zdjęcie w formacie 18cm x 13cm!
              </Title>
              <img
                src={generated}
                alt="uploaded image"
                style={{ width: "50%" }}
              />

              <div style={{padding: 20}}>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                  size={"large"}
                >
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
