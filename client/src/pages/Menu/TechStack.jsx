import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Table,
  Popconfirm,
  message,
} from "antd";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box } from "@mui/material";
import useAddTechStack from "../../hooks/TechStackHook/useAddTechStack";
import useGetAllTechStack from "../../hooks/TechStackHook/useGetAllTechStack";
import useDeleteTechStack from "../../hooks/TechStackHook/useDeleteTechStack";

const TechStack = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addTechStack, loading: addLoading } = useAddTechStack();
  const { images, loading: fetchLoading, refetch } = useGetAllTechStack();
  const { deleteTechStack, loading: deleteLoading } = useDeleteTechStack();

  const [form] = Form.useForm();

  // Add tech stack handler
  const handleFormSubmit = async (values) => {
    try {
      await addTechStack(values);
      setIsModalOpen(false);
      form.resetFields();
      refetch();
    } catch (error) {
      message.error('Failed to add new tech stack!');
    }
  };

  // Delete tech stack handler
  const handleDeleteTechStack = async (id) => {
    try {
      await deleteTechStack(id);
      refetch();
      message.success('Tech stack deleted successfully!');
    } catch (error) {
      message.error('Failed to delete tech stack!');
    }
  };

  // Table columns
  const columns = [
    {
      title: "Tech Stack Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={record.fullUrl} // Use fullUrl to display the image
          alt="tech stack"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this tech stack?"
          onConfirm={() => handleDeleteTechStack(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography.Title level={4}>Add Tech Stack Image</Typography.Title>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          type="primary"
          style={{
            backgroundColor: "#0A5E4F",
            color: "#fff",
            margin: "0 20px",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <AddCircleOutlineOutlinedIcon />
          <span>New Tech Stack Image</span>
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

      {/* Modal for Adding New Tech Stack Image */}
      <Modal
        title="Add New Tech Stack Image"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Tech Stack Image URL"
            name="image"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={addLoading}
              style={{ width: "100%", fontWeight: "bold", background: "#0A5E4F" }}
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
