"use client";

import React from "react";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { ITaskInterface, TaskStatus, TaskPriority } from "@/schema/task.schema";
import { useAuth } from "@/providers/AuthContext";
import { useAddTask, useUpdateTask } from "@/app/api-controllers/tasks/queries";
import moment from "moment";

const { Option } = Select;

const CreateForm: React.FC = () => {
  const { username } = useAuth();

  const {
    setSuccess,
    success,
    createForm,
    setOpen,
    setSelectedUserId,
    selectedUserId,
  } = useAuth();

  const { mutate: createTask } = useAddTask();
  const { mutate: updateTask } = useUpdateTask();

  const onFinish = (values: ITaskInterface) => {
    const payload = {
      title: values.title,
      description: values.description,
      status: values.status,
      priority: values.priority,
      deadline: new Date(`${values?.deadline}`)
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("/"),
      username: username,
    };

    if (selectedUserId) {
      updateTask(
        { ...payload, taskId: selectedUserId },
        {
          onSuccess: () => {
            message.success(`Task Updated`);
            createForm.resetFields();
            setSuccess(!success);
            setOpen(false);
            setSelectedUserId("");
          },
          onError: (err) => {
            message.error(`Failed ${err.message}`);
          },
        }
      );
    } else {
      createTask(payload, {
        onSuccess: () => {
          message.success(`Task Added`);
          createForm.resetFields();
          setSuccess(!success);
          setOpen(false);
        },
        onError: (err) => {
          message.error(`Failed ${err.message}`);
        },
      });
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createForm.submit();
    }
  };

  const disabledDate = (current: moment.Moment | any) => {
    return current && current < moment().startOf("day");
  };

  return (
    <div className="max-w-2xl p-8 rounded-md space-y-12">
      <div className="border-b-[1px] border-gray-300 pb-4">
        <Form
          layout="vertical"
          className="space-y-4"
          form={createForm}
          onFinish={onFinish}
          onKeyDown={handleEnterPress}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input
              placeholder="Title"
              className="text-4xl font-bold border-none p-0 focus:ring-0"
            />
          </Form.Item>

          <div className="flex items-center space-x-2">
            <Image
              src={"/images/status.png"}
              alt="status"
              width={24}
              height={24}
              className="w-[24px] h-[24px] "
            />
            <span>Status</span>
            <Form.Item
              name="status"
              rules={[{ required: true, message: "Status is required" }]}
              className="flex-1 m-0"
            >
              <Select
                placeholder="Not selected"
                className="border-none p-0 focus:ring-0 w-full"
              >
                {Object.values(TaskStatus).map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Image
              src={"/images/priority.png"}
              alt="priority"
              width={24}
              height={24}
              className="w-[24px] h-[24px] "
            />
            <span>Priority</span>
            <Form.Item name="priority" className="flex-1 m-0">
              <Select
                placeholder="Not selected"
                className="border-none p-0 focus:ring-0 w-full"
              >
                {Object.values(TaskPriority).map((priority) => (
                  <Option key={priority} value={priority}>
                    {priority}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Image
              src={"/images/calender.png"}
              alt="status"
              width={24}
              height={24}
              className="w-[24px] h-[24px] "
            />
            <span>Deadline</span>
            <Form.Item name="deadline" className="flex-1 m-0">
              <DatePicker
                placeholder="Not selected"
                className="w-full border-none p-0 focus:ring-0"
                disabledDate={disabledDate}
              />
            </Form.Item>
          </div>

          <div className="flex items-center space-x-2">
            <Image
              src={"/images/edit.png"}
              alt="status"
              width={24}
              height={24}
              className="w-[24px] h-[24px] "
            />
            <span>Description</span>
            <Form.Item name="description" className="flex-1 m-0 pt-[18px]">
              <Input.TextArea
                placeholder="Not selected"
                className="border-none p-0 focus:ring-0"
              />
            </Form.Item>
          </div>

          <div className="flex items-center space-x-6 text-gray-900 cursor-pointer font-semibold">
            <PlusOutlined className="text-md" />
            <span className="text-lg">Add custom property</span>
          </div>
        </Form>
      </div>
      <div className="flex justify-between">
        <div className="text-gray-600">
          <div>Start writing, or drag your own files here.</div>
          <div>Press Enter or Click Submit to Save Task.</div>
        </div>
        <button
          type="submit"
          className="bg-gray-300 px-4 py-1 rounded-lg"
          onClick={() => createForm.submit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
