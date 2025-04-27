import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Popconfirm,
  Tag,
  message,
  Table,
} from "antd";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box } from "@mui/material";
import useAddPortfolio from "../../hooks/PortfolioHook/useAddPortfolio";
import useGetAllPortfolio from "../../hooks/PortfolioHook/useGetAllPortfolio";
import useUpdatePortfolio from "../../hooks/PortfolioHook/useUpdatePortfolio";
import axios from "axios";

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [techStack, setTechStack] = useState([]); // State for tech stack array
  const [newTech, setNewTech] = useState(""); // For Add Modal
  const [editNewTech, setEditNewTech] = useState(""); // For Edit Modal

  const {
    addPortfolio,
    loading: addPortfolioLoading,
    error: addError,
  } = useAddPortfolio();
  const {
    updatePortfolio,
    loading: updateLoading,
    error: updateError,
  } = useUpdatePortfolio();
  const { portfolios, loading, refetchPortfolios } = useGetAllPortfolio();

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Add portfolio handler
  const handleFormSubmit = async (values) => {
    const portfolioData = { ...values, projectTechStack: techStack };
    await addPortfolio(portfolioData);
    if (!addError) {
      setIsModalOpen(false);
      form.resetFields();
      setTechStack([]); // Reset tech stack after successful submission
      refetchPortfolios();
    }
  };

  // Add tech stack item to the list
  const handleAddTechStack = () => {
    if (newTech && !techStack.includes(newTech)) {
      setTechStack([...techStack, newTech]);
      setNewTech(""); // Clear the input field after adding
    } else {
      message.error(
        "Please enter a valid tech stack or tech stack already exists."
      );
    }
  };

  // Add tech in Edit Modal
  const handleAddTechStackInEdit = () => {
    if (editNewTech && !techStack.includes(editNewTech)) {
      setTechStack([...techStack, editNewTech]);
      setEditNewTech("");
    } else {
      message.error(
        "Please enter a valid tech stack or tech stack already exists."
      );
    }
  };

  // Remove tech stack item from the list
  const handleRemoveTechStack = (tech) => {
    setTechStack(techStack.filter((item) => item !== tech));
  };

  // Delete portfolio handler
  const handleDeletePortfolio = async (id) => {
    try {
      await axios.delete(`https://mern-portfolio-backend-ef1q.onrender.com/api/projects/portfolio/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("Portfolio deleted successfully.");
      refetchPortfolios();
    } catch (err) {
      message.error("Failed to delete portfolio.");
    }
  };

  // Edit modal open
  const handleEdit = (portfolio) => {
    setEditingPortfolio(portfolio);
    editForm.setFieldsValue({
      projectTitle: portfolio.projectTitle,
      projectDescription: portfolio.projectDescription,
      projectGithubUrl: portfolio.projectGithubUrl,
      projectDemoUrl: portfolio.projectDemoUrl,
    });
    setTechStack(portfolio.projectTechStack || []);
    setEditNewTech(""); // Reset the edit new tech input
    setIsEditModalOpen(true);
  };

  // Submit update
  const handleUpdate = async (values) => {
    const portfolioData = { ...values, projectTechStack: techStack };
    await updatePortfolio(editingPortfolio._id, portfolioData);
    if (!updateError) {
      setIsEditModalOpen(false);
      refetchPortfolios();
    }
  };

  // Columns for the portfolio table
  const columns = [
    {
      title: "Project Title",
      dataIndex: "projectTitle",
      key: "projectTitle",
    },
    {
      title: "Description",
      dataIndex: "projectDescription",
      key: "projectDescription",
    },
    {
      title: "Tech Stack",
      dataIndex: "projectTechStack",
      key: "projectTechStack",
      render: (techStack) => (
        <>
          {techStack.map((tech, index) => (
            <Tag key={index}>{tech}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, portfolio) => (
        <div>
          <Button type="link" onClick={() => handleEdit(portfolio)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this project?"
            onConfirm={() => handleDeletePortfolio(portfolio._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography.Title level={4}>Portfolio Management</Typography.Title>
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
          <span style={{ marginLeft: "8px" }}>New Portfolio</span>
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
        {/* Portfolio List Table */}
        <Table
          dataSource={portfolios}
          columns={columns}
          loading={loading}
          rowKey="_id"
        />
      </Box>



      {/* Modal for Adding Portfolio */}
      <Modal
        title="Add New Portfolio"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setTechStack([]); // Reset tech stack when closing modal
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Project Title"
            name="projectTitle"
            rules={[
              { required: true, message: "Please enter the project title" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Project Description"
            name="projectDescription"
            rules={[
              {
                required: true,
                message: "Please enter the project description",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Github URL"
            name="projectGithubUrl"
            rules={[{ required: true, message: "Please enter the Github URL" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Demo URL"
            name="projectDemoUrl"
            rules={[{ required: true, message: "Please enter the Demo URL" }]}
          >
            <Input />
          </Form.Item>

          {/* Tech Stack Input */}
          <Form.Item label="Tech Stack">
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Enter a tech stack"
                style={{ width: "70%" }}
              />
              <Button
                type="primary"
                onClick={handleAddTechStack}
                style={{ marginLeft: "10px" }}
              >
                Add Tech
              </Button>
            </div>

            {/* Display tech stack tags */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                overflowY: "auto", 
                maxHeight: "100px",
              }}
            >
              {techStack.map((tech, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => handleRemoveTechStack(tech)}
                  style={{ marginBottom: "5px" }}
                >
                  {tech}
                </Tag>
              ))}
            </div>
          </Form.Item>

          {/* Add Portfolio Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={addPortfolioLoading}
              style={{
                width: "100%",
                fontWeight: "bold",
                background: "#0A5E4F",
              }}
            >
              Add Portfolio
            </Button>
          </Form.Item>
        </Form>

        {addError && (
          <Typography.Text type="danger">{addError}</Typography.Text>
        )}
      </Modal>



      {/* Modal for Editing Portfolio */}
      <Modal
        title="Edit Portfolio"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          editForm.resetFields();
          setTechStack([]); // Reset tech stack when closing modal
        }}
        footer={null}
      >
        <Form layout="vertical" form={editForm} onFinish={handleUpdate}>
          <Form.Item
            label="Project Title"
            name="projectTitle"
            rules={[
              { required: true, message: "Please enter the project title" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Project Description"
            name="projectDescription"
            rules={[
              {
                required: true,
                message: "Please enter the project description",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Github URL"
            name="projectGithubUrl"
            rules={[{ required: true, message: "Please enter the Github URL" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Demo URL"
            name="projectDemoUrl"
            rules={[{ required: true, message: "Please enter the Demo URL" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Tech Stack">
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Input
                value={editNewTech}
                onChange={(e) => setEditNewTech(e.target.value)}
                placeholder="Enter a tech stack"
                style={{ width: "70%" }}
              />
              <Button
                type="primary"
                onClick={handleAddTechStackInEdit}
                style={{ marginLeft: "10px" }}
              >
                Add Tech
              </Button>
            </div>

            {/* Display tech stack tags in edit modal */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                overflowY: "auto", // Adds scrolling if there are too many tags
                maxHeight: "100px", // or just remove it
              }}
            >
              {techStack.map((tech, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => handleRemoveTechStack(tech)}
                  style={{ marginBottom: "5px" }}
                >
                  {tech}
                </Tag>
              ))}
            </div>
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
              Update Portfolio
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

export default Portfolio;
