import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Typography,
  Table,
  Popconfirm,
  message,
} from "antd";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box } from "@mui/material";
import useGetAllTechStack from "../../hooks/TechStackHook/useGetAllTechStack";
import useAddTechStack from "../../hooks/TechStackHook/useAddTechStack";
import useDeleteTechStack from "../../hooks/TechStackHook/useDeleteTechStack";

const TechStack = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form] = Form.useForm();

  const { images, loading: fetchLoading, refetch } = useGetAllTechStack();
  const { deleteTechStack, loading: deleteLoading } = useDeleteTechStack();
  const { uploadImage, loading: addLoading } = useAddTechStack();

  const handleFormSubmit = async () => {
    if (!selectedFile) {
      return message.error("Please select an image file!");
    }
  
    try {
      await uploadImage(selectedFile);
      await refetch(); // Refresh the list after successful upload
  
      // Reset modal and form after successful upload
      form.resetFields();
      setSelectedFile(null);
      setIsModalOpen(false);
  
      // Reset the file input value
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  

  const handleDeleteTechStack = async (id) => {
    try {
      await deleteTechStack(id);
      refetch();
      message.success("Tech stack deleted successfully!");
    } catch (error) {
      message.error("Failed to delete tech stack!");
    }
  };

  const columns = [
    {
      title: "Tech Stack Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) =>
        record.fullUrl ? (
          <img
            src={record.fullUrl}
            alt="tech stack"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        ) : (
          <Typography.Text type="secondary">No Image Available</Typography.Text>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this tech stack?"
          onConfirm={() => handleDeleteTechStack(record.asset_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger loading={deleteLoading}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography.Title level={4}>Add Tech Stack Image</Typography.Title>

      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Button
          type="primary"
          style={{
            backgroundColor: "#0A5E4F",
            color: "#fff",
            marginLeft: "20px",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <AddCircleOutlineOutlinedIcon />
          <span style={{ marginLeft: "8px" }}>New Tech Stack Image</span>
        </Button>
      </Box>

      <Box
        m="30px 0 0 0"
        width="72vw"
        sx={{
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <Table
          columns={columns}
          dataSource={images}
          loading={fetchLoading}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      </Box>

      <Modal
        title="Add New Tech Stack Image"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setSelectedFile(null);
        }}
        footer={null}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Upload Tech Stack Image">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={handleFormSubmit}
              loading={addLoading}
              disabled={!selectedFile}
              htmlType="button"
              style={{
                width: "100%",
                fontWeight: "bold",
                background: "#0A5E4F",
              }}
            >
              Add Image
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Box>
  );
};

export default TechStack;
