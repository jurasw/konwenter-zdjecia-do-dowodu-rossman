import React, { useState } from "react";
import { Button, Radio, RadioChangeEvent, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { DownloadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState([900, 1300, 6]);
  const [generated, setGenerated] = useState("");

  const { Title } = Typography;

  const props = {
    accept: ".png,.jpeg",
    beforeUpload: (file: File) => {
      setFile(file);
      const canvas = document.createElement("canvas");
      canvas.height = value[0];
      canvas.width = value[1];
      let amount = value[2];

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        for (let i = 0; i < amount; i++) {
          const x = (i % (amount / 2)) * 350;
          const y = Math.floor(i / (amount / 2)) * 450;
          ctx.drawImage(img, x, y, 350, 450);
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
    canvas.height = value[0];
    canvas.width = value[1];
    let amount = value[2];

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      for (let i = 0; i < amount; i++) {
        const x = (i % (amount / 2)) * 350;
        const y = Math.floor(i / (amount / 2)) * 450;
        ctx.drawImage(img, x, y, 350, 450);
      }

      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = canvas.toDataURL("image/jpeg");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  const valueChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    if (!file) return;
    const canvas = document.createElement("canvas");
    canvas.height = e.target.value[0];
    canvas.width = e.target.value[1];
    let amount = e.target.value[2];

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      for (let i = 0; i < amount; i++) {
        const x = (i % (amount / 2)) * 350;
        const y = Math.floor(i / (amount / 2)) * 450;
        ctx.drawImage(img, x, y, 350, 450);
      }

      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = canvas.toDataURL("image/jpeg");
      document.body.appendChild(link);
      setGenerated(link.href);
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
          <Title level={2}>
            Konwenter zdjęcie do dowodu/paszportu/legitymacji do wydrukowania w
            rossmanie
          </Title>
          <Radio.Group
            value={value}
            onChange={valueChange}
            style={{ paddingBottom: 20 }}
          >
            <Radio.Button value={[900, 1300, 6]}>9x13cm</Radio.Button>
            <Radio.Button value={[1000, 1500, 8]}>10x15cm</Radio.Button>
            <Radio.Button value={[1300, 1800, 10]}>13x18cm</Radio.Button>
          </Radio.Group>
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
                Pammiętaj aby wydrukować zdjęcie w formacie {value[0]/100}cm x {value[1]/100}cm!
              </Title>
              <img
                src={generated}
                alt="uploaded image"
                style={{ width: "50%" }}
              />

              <div style={{ padding: 20 }}>
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
