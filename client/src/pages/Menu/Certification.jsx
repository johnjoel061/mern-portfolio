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
import { DatePicker } from "antd";
import dayjs from "dayjs"; 
import useAddCertification from "../../hooks/CertificationHook/useAddCertification";
import useGetAllCertification from "../../hooks/CertificationHook/useGetAllCertification";
import useUpdateCertification from "../../hooks/CertificationHook/useUpdateCertification";
import axios from "axios";

const Certification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);

  const {
    addCertification,
    loading: addCertificationLoading,
    error: addError,
  } = useAddCertification();
  const {
    updateCertification,
    loading: updateLoading,
    error: updateError,
  } = useUpdateCertification();
  const { certifications, loading, refetchCertifications } =
    useGetAllCertification();

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const handleFormSubmit = async (values) => {
    await addCertification(values);
    if (!addError) {
      setIsModalOpen(false);
      form.resetFields();
      refetchCertifications();
    }
  };

  const handleDeleteCertificate = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/recognition/certification/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Certificate deleted successfully.");
      refetchCertifications();
    } catch (err) {
      message.error("Failed to delete certificate.");
    }
  };

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate);
    setIsEditModalOpen(true);
  
    editForm.setFieldsValue({
      certificationName: certificate.certificationName,
      certificationDescription: certificate.certificationDescription,
      certificationDate: dayjs(certificate.certificationDate), // ensure it's a dayjs object
      certificationLink: certificate.certificationLink,
    });
  };  

  const handleUpdate = async (values) => {
    const formattedValues = {
      ...values,
      certificationDate: values.certificationDate.format("YYYY-MM-DD"),
    };
    await updateCertification(editingCertificate._id, formattedValues);
    if (!updateError) {
      setIsEditModalOpen(false);
      refetchCertifications();
    }
  };

  const sortedCertifications = certifications.sort((a, b) =>
    new Date(b.certificationDate) > new Date(a.certificationDate) ? 1 : -1
  );
  
  const columns = [
    {
      title: "Certification Name",
      dataIndex: "certificationName",
      key: "certificationName",
    },
    {
      title: "Description",
      dataIndex: "certificationDescription",
      key: "certificationDescription",
    },
    {
      title: "Date",
      dataIndex: "certificationDate",
      key: "certificationDate",
      render: (text) => dayjs(text).format("MMMM D, YYYY"),
    },
    {
      title: "Link",
      dataIndex: "certificationLink",
      key: "certificationLink",
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
            title="Are you sure you want to delete this certificate?"
            onConfirm={() => handleDeleteCertificate(record._id)}
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
      <Typography.Title level={4}>Certification Management</Typography.Title>
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
          <span style={{ marginLeft: "8px" }}>New Certification</span>
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
          dataSource={sortedCertifications}
          loading={loading}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      </Box>

      {/* Add Certification Modal */}
      <Modal
        title="Add New Certification"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Certification Name"
            name="certificationName"
            rules={[
              {
                required: true,
                message: "Please enter the certification name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Certification Description"
            name="certificationDescription"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Certification Date"
            name="certificationDate"
            rules={[
              {
                required: true,
                message: "Please select the certification date",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Certification Link"
            name="certificationLink"
            rules={[{ required: true, message: "Please enter the link" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={addCertificationLoading}
              style={{
                width: "100%",
                fontWeight: "bold",
                background: "#0A5E4F",
              }}
            >
              Add Certification
            </Button>
          </Form.Item>
        </Form>

        {addError && (
          <Typography.Text type="danger">{addError}</Typography.Text>
        )}
      </Modal>

      {/* Edit Certification Modal */}
      <Modal
        title="Edit Certification"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          editForm.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={editForm} onFinish={handleUpdate}>
          <Form.Item
            label="Certification Name"
            name="certificationName"
            rules={[
              {
                required: true,
                message: "Please enter the certification name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Certification Description"
            name="certificationDescription"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Certification Date"
            name="certificationDate"
            rules={[
              {
                required: true,
                message: "Please select the certification date",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Certification Link"
            name="certificationLink"
            rules={[{ required: true, message: "Please enter the link" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateLoading}
              style={{
                width: "100%",
                fontWeight: "bold",
                background: "#0A5E4F",
              }}
            >
              Update Certification
            </Button>
          </Form.Item>
        </Form>

        {updateError && (
          <Typography.Text type="danger">{updateError}</Typography.Text>
        )}
      </Modal>
    </Box>
  );
};

export default Certification; 