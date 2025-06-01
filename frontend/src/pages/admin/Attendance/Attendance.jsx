import AdminLayout from "@/layouts/AdminLayout";
import AdminPadding from "@/layouts/AdminPadding";
import React, { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { createEvent, getEvents } from "@/services/api/apiEndpoints";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // This would normally come from your UI library
  const toast = (props) => {
    console.log("Toast:", props);
    // Implement your own toast notification or import from your UI library
  };

  const fetchEvents = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getEvents(page);
      if (response.success) {
        setEvents(response.data);
        setTotalPages(response.pagination.totalPages);
        setCurrentPage(response.pagination.currentPage);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching events",
        description: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const generateEventName = () => {
    const today = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[today.getDay()];
    const date = today.getDate();
    const year = today.getFullYear();

    // Format the date with ordinal suffix (1st, 2nd, 3rd, etc.)
    const getOrdinalSuffix = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${day} ${getOrdinalSuffix(date)}, ${year} Attendance`;
  };

  const handleCreateEvent = async () => {
    setIsCreating(true);
    try {
      const eventName = generateEventName();
      const response = await createEvent({ name: eventName });

      if (response.success) {
        toast({
          title: "Event created",
          description: "Event has been created successfully",
        });
        fetchEvents();
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating event",
        description: error.message || "Something went wrong",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const navigateToAttendance = (eventId) => {
    // This is where you'd handle navigation to the attendance page for a specific event
    console.log(`Navigate to attendance for event: ${eventId}`);
    // Example: router.push(`/admin/attendance/${eventId}`)
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchEvents(newPage);
    }
  };

  // Simple Dialog component
  const Dialog = ({
    isOpen,
    onClose,
    title,
    description,
    onConfirm,
    isLoading,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-500">{description}</p>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SkeletonRow = () => (
    <tr>
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
      </td>
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
      </td>
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
        <div className="animate-pulse h-8 bg-gray-200 rounded w-24 ml-auto"></div>
      </td>
    </tr>
  );

  return (
    <AdminLayout>
      <AdminPadding>
        <div className="w-full space-y-6">
          {/* Responsive header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Event Attendance
            </h1>

            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus size={16} />
              <span>Create Event</span>
            </button>
          </div>

          {/* Responsive table container */}
          <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  // Add 5 skeleton rows while loading
                  [...Array(5)].map((_, index) => <SkeletonRow key={index} />)
                ) : events.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6">
                      No events found
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event._id}>
                      <td
                        onClick={() =>
                          navigate(`/admin/attendance/${event?._id}`)
                        }
                        className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium cursor-pointer text-sm"
                      >
                        {event.name}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                        {formatDate(event.createdAt)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                        <button
                          className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm hover:bg-gray-50"
                          onClick={() => navigateToAttendance(event._id)}
                        >
                          <Calendar size={14} />
                          <span className="hidden sm:inline">Attendance</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Responsive pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <button
                className="p-1 rounded-md border border-gray-300 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs sm:text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="p-1 rounded-md border border-gray-300 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Add Dialog component here */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Create New Event"
          description="Are you sure you want to create a new attendance event?"
          onConfirm={handleCreateEvent}
          isLoading={isCreating}
        />
      </AdminPadding>
    </AdminLayout>
  );
};

export default Attendance;
