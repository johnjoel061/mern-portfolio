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
import useAddExperience from "../../hooks/ExperienceHook/useAddExperience";
import useGetAllExperience from "../../hooks/ExperienceHook/useGetAllExperience";
import useUpdateExperience from "../../hooks/ExperienceHook/useUpdateExperience";
import axios from "axios";

const Experience = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const { addExperience, loading: addExperienceLoading, error: addError } = useAddExperience();
  const { updateExperience, loading: updateLoading, error: updateError } = useUpdateExperience();
  const { experiences, loading, refetchExperiences } = useGetAllExperience();

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Add experience handler
  const handleFormSubmit = async (values) => {
    await addExperience(values);
    if (!addError) {
      setIsModalOpen(false);
      form.resetFields();
      refetchExperiences();
    }
  };

  // Delete experience handler
  const handleDeleteExperience = async (id) => {
    try {
      await axios.delete(`https://mern-portfolio-backend-ef1q.onrender.com/api/employment/experience/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("Experience deleted successfully.");
      refetchExperiences();
    } catch (err) {
      message.error("Failed to delete experience.");
    }
  };

  // Edit modal open
  const handleEdit = (experience) => {
    setEditingExperience(experience);
    editForm.setFieldsValue({
      experienceName: experience.experienceName,
      companyName: experience.companyName,
      experienceDate: experience.experienceDate,
      experienceDescription: experience.experienceDescription,
    });
    setIsEditModalOpen(true);
  };

  // Submit update
  const handleUpdate = async (values) => {
    await updateExperience(editingExperience._id, values);
    if (!updateError) {
      setIsEditModalOpen(false);
      refetchExperiences();
    }
  };

  // Table columns
  const columns = [
    {
      title: "Experience Name",
      dataIndex: "experienceName",
      key: "experienceName",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Experience Date",
      dataIndex: "experienceDate",
      key: "experienceDate",
    },
    {
      title: "Experience Description",
      dataIndex: "experienceDescription",
      key: "experienceDescription",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this experience?"
            onConfirm={() => handleDeleteExperience(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography.Title level={4}>Experience Management</Typography.Title>
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
          <span style={{ marginLeft: "8px" }}>New Experience</span>
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
          dataSource={experiences}
          loading={loading}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      </Box>

      {/* Modal for Adding Experience */}
      <Modal
        title="Add New Experience"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Experience Name"
            name="experienceName"
            rules={[{ required: true, message: "Please enter the experience name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please enter the company name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Experience Date"
            name="experienceDate"
            rules={[{ required: true, message: "Please enter the experience date" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Experience Description"
            name="experienceDescription"
            rules={[{ required: true, message: "Please enter the experience description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={addExperienceLoading}
              style={{ width: "100%", fontWeight: "bold", background: "#0A5E4F" }}
            >
              Add Experience
            </Button>
          </Form.Item>
        </Form>

        {addError && <Typography.Text type="danger">{addError}</Typography.Text>}
      </Modal>

      {/* Modal for Editing Experience */}
      <Modal
        title="Edit Experience"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          editForm.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={editForm} onFinish={handleUpdate}>
          <Form.Item
            label="Experience Name"
            name="experienceName"
            rules={[{ required: true, message: "Please enter the experience name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please enter the company name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Experience Date"
            name="experienceDate"
            rules={[{ required: true, message: "Please enter the experience date" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Experience Description"
            name="experienceDescription"
            rules={[{ required: true, message: "Please enter the experience description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateLoading}
              style={{ width: "100%", fontWeight: "bold", background: "#0A5E4F" }}
            >
              Update Experience
            </Button>
          </Form.Item>
        </Form>

        {updateError && <Typography.Text type="danger">{updateError}</Typography.Text>}
      </Modal>
    </Box>
  );
};

export default Experience;
