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
import useAddEducationHook from "../../hooks/EducationHook/useAddEducationHook";
import useGetAllEducationHook from "../../hooks/EducationHook/useGetAllEducationHook";
import useUpdateEducationHook from "../../hooks/EducationHook/useUpdateEducationHook";
import axios from "axios";

const Education = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  const { addEducation, loading: addLoading, error: addError } = useAddEducationHook();
  const { updateEducation, loading: updateLoading, error: updateError } = useUpdateEducationHook();
  const { education, loading, refetchEducation } = useGetAllEducationHook();

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Add education
  const handleFormSubmit = async (values) => {
    await addEducation(values);
    if (!addError) {
      setIsModalOpen(false);
      form.resetFields();
      refetchEducation();
      message.success("Education added successfully.");
    }
  };

  // Delete education
  const handleDeleteEducation = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/school/education/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("Education deleted successfully.");
      refetchEducation();
    } catch (err) {
      message.error("Failed to delete education.");
    }
  };

  // Open edit modal
  const handleEdit = (educationItem) => {
    setEditingEducation(educationItem);
    editForm.setFieldsValue({
      educationName: educationItem.educationName,
      courseName: educationItem.courseName,
      educationDate: educationItem.educationDate,
    });
    setIsEditModalOpen(true);
  };

  // Submit updated education
  const handleUpdate = async (values) => {
    await updateEducation(editingEducation._id, values);
    if (!updateError) {
      setIsEditModalOpen(false);
      refetchEducation();
      message.success("Education updated successfully.");
    }
  };

  const columns = [
    {
      title: "Education Name",
      dataIndex: "educationName",
      key: "educationName",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Education Date",
      dataIndex: "educationDate",
      key: "educationDate",
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
            title="Are you sure you want to delete this education record?"
            onConfirm={() => handleDeleteEducation(record._id)}
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
      <Typography.Title level={4}>Education Management</Typography.Title>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          type="primary"
          style={{ backgroundColor: "#0A5E4F", color: "#fff", margin: "0 20px" }}
          onClick={() => setIsModalOpen(true)}
        >
          <AddCircleOutlineOutlinedIcon />
          <span style={{ marginLeft: "8px" }}>New Education</span>
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
          dataSource={education}
          loading={loading}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      </Box>

      {/* Add Modal */}
      <Modal
        title="Add New Education"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Education Name"
            name="educationName"
            rules={[{ required: true, message: "Please enter the education name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Course Name"
            name="courseName"
            rules={[{ required: true, message: "Please enter the course name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Education Date"
            name="educationDate"
            rules={[{ required: true, message: "Please enter the education date" }]}
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
              Add Education
            </Button>
          </Form.Item>
        </Form>
        {addError && <Typography.Text type="danger">{addError}</Typography.Text>}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Education"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          editForm.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={editForm} onFinish={handleUpdate}>
          <Form.Item
            label="Education Name"
            name="educationName"
            rules={[{ required: true, message: "Please enter the education name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Course Name"
            name="courseName"
            rules={[{ required: true, message: "Please enter the course name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Education Date"
            name="educationDate"
            rules={[{ required: true, message: "Please enter the education date" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateLoading}
              style={{ width: "100%", fontWeight: "bold", background: "#0A5E4F" }}
            >
              Update Education
            </Button>
          </Form.Item>
        </Form>
        {updateError && <Typography.Text type="danger">{updateError}</Typography.Text>}
      </Modal>
    </Box>
  );
};

export default Education;
