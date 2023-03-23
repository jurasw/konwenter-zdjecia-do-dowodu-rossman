import React, { useState } from "react";
import { Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { DownloadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const props = {
    accept: ".png,.jpeg",
    beforeUpload: (file: File) => {
      setFile(file);
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
        height: "100vh",
        background: "#f5f5f5",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "80%",
          background: "#fff",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 50,
          borderRadius: 20,
        }}
      >
        <ImgCrop rotationSlider aspect={35 / 45}>
          <Dragger {...props} style={{ maxHeight: "300px" }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </ImgCrop>

        {file && (
          <div>
            {/* <img src={URL.createObjectURL(file)} alt="uploaded image" /> */}
            <Button
              type="primary"
              onClick={handleDownload}
              icon={<DownloadOutlined />}
              size={"large"}
            >
              Download
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
