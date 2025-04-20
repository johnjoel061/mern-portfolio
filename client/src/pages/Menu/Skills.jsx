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
  const { loading: addSkillLoading, error, addSkill } = useAddSkill();
  const { skills, loading, refetchSkills } = useGetAllSkill();

  // Form submit handler for adding a skill
  const handleFormSubmit = async (values) => {
    const { skillName, skillDescription } = values; // Extract skill name and description from values
    await addSkill(skillName, skillDescription); // Use the addSkill hook with skill description
    if (!error) {
      setIsModalOpen(false); // Close modal on success
      refetchSkills(); // Refetch skills to update the table
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
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Skill Name"
            style={{ fontWeight: "bold" }}
            name="skillName"
            rules={[{ required: true, message: "Please enter the skill name" }]}
            className="custom-input"
          >
            <Input className="ant-input" />
          </Form.Item>

          <Form.Item
            label="Skill Description"
            style={{ fontWeight: "bold" }}
            name="skillDescription"
            rules={[{ required: true, message: "Please enter the skill description" }]}
            className="custom-input"
          >
            <Input.TextArea className="ant-input" rows={3} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={addSkillLoading}
              style={{
                width: "100%",
                fontWeight: "bold",
                background: "#0A5E4F",
              }}
            >
              Add Skill
            </Button>
          </Form.Item>
        </Form>

        {/* Show error message if exists */}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </Modal>
    </Box>
  );
};

export default Skills;
