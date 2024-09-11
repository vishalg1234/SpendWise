import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const [form] = Form.useForm();

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const handleCancel = () => {
    setShowModal(false);
    setEditable(null);
    form.resetFields();
  };

  //getall transaction

  //useEffect Hook
  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransaction(res.data);
        setLoading(false);
      } catch (error) {
        message.error("Fetch Issue With Transaction");
      }
    };
    getAllTransaction();
  }, [frequency, selectedDate, type, setAllTransaction, refetch]);

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transactions/delete-transaction", {
        transacationId: record._id,
      });

      setLoading(false);
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("unable to delete");
    }
    setRefetch(!refetch);
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/transactions/update-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("please fill all fields");
    }
    setRefetch(!refetch);
  };

  return (
    <div className="">
      <Header />
      {loading && <Spinner />}
      <div className="rounded-lg shadow ml-4 mr-4 ">
        <div className="filters flex justify-between items-center p-6 ml-10 mr-10">
          <div>
            <h6 className="pb-2">Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">LAST 1 Week</Select.Option>
              <Select.Option value="30">LAST 1 Month</Select.Option>
              <Select.Option value="365">LAST 1 year</Select.Option>
              <Select.Option value="custom">custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedate(values)}
              />
            )}
          </div>
          <div className="filter-tab">
            <h6 className="pb-2 pl-8">Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
          </div>
          <div className="switch-icons">
            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>
          <div>
            <button
              className="btn bg-green-400 hover:bg-green-500"
              onClick={() => setShowModal(true)}
            >
              Add Transaction
            </button>
          </div>
        </div>

        <div className="content font-semibold ml-10 mr-10">
          {viewData === "table" ? (
            <Table columns={columns} dataSource={allTransaction} />
          ) : (
            <Analytics allTransaction={allTransaction} />
          )}
        </div>
        <Modal
          title={editable ? "Edit Transaction" : "Add Transection"}
          open={showModal}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            initialValues={editable}
            className=""
          >
            <Form.Item label="Amount" name="amount">
              <Input type="text" required />
            </Form.Item>
            <Form.Item label="type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="food">Food and Dining</Select.Option>
                <Select.Option value="travel">
                  Travel and Transportation
                </Select.Option>
                <Select.Option value="education">Education</Select.Option>
                <Select.Option value="shopping">Shopping</Select.Option>
                <Select.Option value="entertainment">
                  Entertainment
                </Select.Option>
                <Select.Option value="health">
                  Health and Wellness
                </Select.Option>
                <Select.Option value="utilities">Utilities</Select.Option>
                <Select.Option value="miscellaneous">
                  Miscellaneous
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn bg-green-400 hover:bg-green-500"
              >
                {" "}
                SAVE
              </button>
            </div>
          </Form>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
