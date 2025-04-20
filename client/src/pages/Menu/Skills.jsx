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
import useAddSkill from "../../hooks/SkillHook/useAddSkill";
import useGetAllSkill from "../../hooks/SkillHook/useGetAllSkill";
import useUpdateSkill from "../../hooks/SkillHook/useUpdateSkill";
import axios from "axios";

const Skills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const { loading: addSkillLoading, error, addSkill } = useAddSkill();
  const { loading: updateLoading, error: updateError, updateSkill } = useUpdateSkill();
  const { skills, loading, refetchSkills } = useGetAllSkill();

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Add skill handler
  const handleFormSubmit = async (values) => {
    const { skillName, skillDescription } = values;
    await addSkill(skillName, skillDescription);
    if (!error) {
      setIsModalOpen(false);
      form.resetFields();
      refetchSkills();
    }
  };

  // Delete skill handler
  const handleDeleteSkill = async (skillId) => {
    try {
      await axios.delete(`http://localhost:3000/api/talent/skill/${skillId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("Skill deleted successfully");
      refetchSkills();
    } catch (err) {
      message.error("Failed to delete skill");
    }
  };

  // Edit skill modal open
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    editForm.setFieldsValue({
      skillName: skill.skillName,
      skillDescription: skill.skillDescription,
    });
    setIsEditModalOpen(true);
  };

  // Submit update
  const handleUpdate = async (values) => {
    const { skillName, skillDescription } = values;
    await updateSkill(editingSkill._id, skillName, skillDescription);
    if (!updateError) {
      setIsEditModalOpen(false);
      refetchSkills();
    }
  };

  // Table columns
  const columns = [
    {
      title: "Skill Name",
      dataIndex: "skillName",
      key: "skillName",
    },
    {
      title: "Skill Description",
      dataIndex: "skillDescription",
      key: "skillDescription",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this skill?"
            onConfirm={() => handleDeleteSkill(record._id)}
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
      <Typography.Title level={4}>Add Skill</Typography.Title>
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
          <span>New Skill</span>
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
          dataSource={skills}
          loading={loading}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      </Box>

      {/* Modal for Adding New Skill */}
      <Modal
        title="Add New Skill"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Skill Name"
            name="skillName"
            rules={[{ required: true, message: "Please enter the skill name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Skill Description"
            name="skillDescription"
            rules={[{ required: true, message: "Please enter the skill description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={addSkillLoading}
              style={{ width: "100%", fontWeight: "bold", background: "#0A5E4F" }}
            >
              Add Skill
            </Button>
          </Form.Item>
        </Form>

        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </Modal>

      {/* Modal for Editing Skill */}
      <Modal
        title="Edit Skill"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          editForm.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={editForm} onFinish={handleUpdate}>
          <Form.Item
            label="Skill Name"
            name="skillName"
            rules={[{ required: true, message: "Please enter the skill name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Skill Description"
            name="skillDescription"
            rules={[{ required: true, message: "Please enter the skill description" }]}
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
              Update Skill
            </Button>
          </Form.Item>
        </Form>

        {updateError && <Typography.Text type="danger">{updateError}</Typography.Text>}
      </Modal>
    </Box>
  );
};

export default Skills;
