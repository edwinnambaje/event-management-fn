import { useQuery } from "@tanstack/react-query";
import { ApiException, Fetcher } from "../lib/fetcher";
import DataWidget from "../components/shared/DataWidget";
import { useState } from "react";
import { toastMessage } from "../components/shared/toast";
import { Modal } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/auth/TextInput";
import { Event } from "../@types";
import ChooseImage from "../components/shared/ChooseImage";

const EventsPage = () => {
  const {
    isLoading,
    data: eventsData,
    error,
    refetch,
  } = useQuery<any, ApiException, { data: Event[] }>({
    queryKey: ["events"],
    queryFn: () => Fetcher.get("/event/all"),
    retry: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = (hasResult: boolean = false, edit = false) => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    if (hasResult) {
      toastMessage(
        edit
          ? "Event updated successfully"
          : "New Event has added successfully!",
        "info"
      );
      refetch();
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold">Events</h1>
        <button
          className="bg-primary text-white px-5 py-2 text-xs font-semibold"
          onClick={showModal}
        >
          Add Event
        </button>
      </div>
      <DataWidget isLoading={isLoading} error={error} retry={refetch}>
        <table className="w-full border-spacing-4 border">
          <thead>
            <tr className="text-left border-b border-t">
              <th className="p-3 pl-4">No</th>
              <th className="p-3">Picture</th>
              <th className="p-3">Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Price</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {eventsData?.data?.map((eventItem, index) => (
              <tr key={eventItem.eventId} className="border-b">
                <td className="p-2 pl-4">{index + 1}</td>
                <td className="p-2">
                  <img
                    src={eventItem.image}
                    alt="Event"
                    width={20}
                    height={20}
                    className="h-[28px] w-[28px] object-cover"
                  />
                </td>
                <td className="p-2">{eventItem.name}</td>
                <td className="p-2">{eventItem.location}</td>
                <td className="p-2">
                  {new Date(eventItem.date).toLocaleDateString()}
                </td>
                <td className="p-2">{eventItem.time}</td>
                <td className="p-2">{eventItem.availableTickets}</td>
                <td className="p-2">{eventItem.price}</td>
                <td className="p-2">
                  {eventItem.isAvailable ? "Available" : "Unavailable"}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="text-xs bg-primary/50 text-white p-1 px-4"
                      onClick={() => {
                        setCurrentEvent(eventItem);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs bg-primary/50 text-white p-1 px-4"
                      onClick={() => {
                        Fetcher.delete(`event/delete/${eventItem.eventId}`)
                          .then(() => {
                            toastMessage(
                              "Event deleted successfully!",
                              "info"
                            );
                            refetch();
                          })
                          .catch((e) => {
                            toastMessage(e.message);
                          });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataWidget>
      <Modal
        title={
          <p className="text-lg">
            {currentEvent ? (
              <>
                Edit <b>{currentEvent.name}</b>
              </>
            ) : (
              "Add"
            )}{" "}
            Event
          </p>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => handleCancel()}
        footer={false}
        bodyStyle={{ padding: "2px" }}
        destroyOnClose
        width={"40%"}
        centered
      >
        <Formik
          initialValues={{
            name: currentEvent?.name ?? "",
            description: currentEvent?.description ?? "",
            location: currentEvent?.location,
            date: currentEvent?.date ?? "",
            time: currentEvent?.time ?? "",
            price: currentEvent?.price ?? "",
            availableTickets: currentEvent?.availableTickets,
            image: currentEvent?.image ?? "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(50).required(),
            description: Yup.string().max(50).required(),
            location: Yup.string().max(50).required(),
            date: Yup.string().max(50).required(),
            image: Yup.string()
              .required("Please add event banner")
              .label("Picture"),
            time: Yup.string().max(100).required(),
            price: Yup.number().required(),
            availableTickets: Yup.number().required(),
          })}
          onSubmit={async (
            values,
            { setErrors, setStatus, setSubmitting, setTouched, resetForm }
          ) => {
            try {
              if (currentEvent) {
                await Fetcher.put("/event/update/" + currentEvent.eventId, {
                  ...values,
                  submit: undefined,
                });
              } else {
                await Fetcher.post("event/create", {
                  ...values,
                  submit: undefined,
                });
              }
              handleCancel(true, Boolean(currentEvent));
              resetForm();
              setSubmitting(false);
              setStatus({ success: true });
              setTouched({});
            } catch (err: any) {
              setStatus({ success: false });
              setErrors({ submit: err.message || "Something went wrong!" });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
            setFieldValue,
          }) => {
            return (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 my-4"
              >
                {errors.submit && (
                  <p
                    className="bg-red-500 p-2 px-4 text-white text-sm text-center"
                    dangerouslySetInnerHTML={{ __html: errors.submit }}
                  ></p>
                )}
                <div className="flex flex-col gap-2">
                  <p>Event Cover</p>
                  <ChooseImage
                    image={values.image}
                    onChange={(image) => setFieldValue("image", image)}
                    onBlur={handleBlur}
                    isTouched={Boolean(touched.image)}
                    error={errors.image}
                    name="image"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <TextInput
                    type="text"
                    name="name"
                    label="Title"
                    placeholder="Enter title"
                    error={errors.name}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isTouched={Boolean(touched.name)}
                  />

                  <TextInput
                    type="text"
                    name="location"
                    label="Location"
                    placeholder="Enter location"
                    error={errors.location}
                    value={values.location ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isTouched={Boolean(touched.location)}
                  />
                  <TextInput
                    type="date"
                    name="date"
                    label="Date"
                    placeholder="Enter date"
                    error={errors.date}
                    value={values.date?.toString() ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isTouched={Boolean(touched.date)}
                  />
                  <TextInput
                    type="time"
                    name="time"
                    label="Time"
                    placeholder="Enter time"
                    error={errors.time as string}
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isTouched={Boolean(touched.time)}
                  />
                  <TextInput
                    type="text"
                    name="price"
                    label="Price"
                    placeholder="Enter price"
                    error={errors.price}
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isTouched={Boolean(touched.price)}
                  />
                  <TextInput
                    type="number"
                    name="availableTickets"
                    label="Available Tickets"
                    placeholder="Enter available tickets"
                    error={errors.availableTickets}
                    value={values.availableTickets ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isTouched={Boolean(touched.availableTickets)}
                  />
                </div>
                <TextInput
                  type="text"
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                  error={errors.description}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isTouched={Boolean(touched.description)}
                  multiLines
                />
                <div className="grid grid-cols-2 pt-3 gap-3">
                  <button
                    type="button"
                    className="text-primary disabled:bg-gray-400 bg-white border border-primary p-2.5 px-10 rounded-xl flex items-center gap-2 justify-center hover:bg-opacity-80"
                    disabled={isSubmitting}
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary disabled:bg-gray-400 text-white p-2.5 px-10 rounded-xl flex items-center gap-2 justify-center hover:bg-opacity-80"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? "Please wait..." : "Submit"}</span>
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default EventsPage;
