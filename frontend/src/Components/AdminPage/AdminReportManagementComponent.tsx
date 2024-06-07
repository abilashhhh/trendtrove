import React, { useEffect, useState } from "react";
import {
  fetchAllPostReportsAndPosts,
  blockPost,
  unblockPost,
} from "../../API/Admin/admin"; // Make sure to import blockPost and unblockPost functions
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

function AdminReportManagementComponent() {
  const [postReports, setPostReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [reportsPerPage] = useState(5);

  const getUserPostsReports = async () => {
    try {
      const response = await fetchAllPostReportsAndPosts();
      if (response.reports) {
        setPostReports(response.reports);
        console.log(response.reports);
      } else {
        toast.error("Failed to fetch post reports");
      }
    } catch (error) {
      console.error("Error fetching post reports:", error);
      toast.error("An error occurred while fetching post reports");
    }
  };

  useEffect(() => {
    getUserPostsReports();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * reportsPerPage;
  const currentReports = postReports.slice(offset, offset + reportsPerPage);
  const pageCount = Math.ceil(postReports.length / reportsPerPage);

  const handleBlockPost = async (postId : string) => {
    try {
      console.log("postid: ", postId)
      await blockPost(postId);
      toast.success("Post blocked successfully");
      setPostReports((prevReports) =>
        prevReports.map((report) =>
          report.postId === postId ? { ...report, postDetails: { ...report.postDetails, isBlocked: true } } : report
        )
      );
    } catch (error) {
      toast.error("Failed to block post");
      console.error("Failed to block post", error);
    }
  };

  const handleUnblockPost = async (postId) => {
    try {
      await unblockPost(postId);
      toast.success("Post unblocked successfully");
      setPostReports((prevReports) =>
        prevReports.map((report) =>
          report.postId === postId ? { ...report, postDetails: { ...report.postDetails, isBlocked: false } } : report
        )
      );
    } catch (error) {
      toast.error("Failed to unblock post");
      console.error("Failed to unblock post", error);
    }
  };

  const confirmBlockUnblock = (postId, isBlocked) => {
    Swal.fire({
      title: isBlocked ? "Unblock Post?" : "Block Post?",
      text: `Are you sure you want to ${isBlocked ? "unblock" : "block"} this post?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isBlocked ? "Yes, unblock" : "Yes, block",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isBlocked) {
          handleUnblockPost(postId);
        } else {
          handleBlockPost(postId);
        }
      }
    });
  };

  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar flex flex-col">
        <h1 className="text-center text-xl font-semibold mb-4">Post Report Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2">Post ID</th>
                <th className="px-4 py-2">Post Details</th>
                <th className="px-4 py-2">Reporter Username</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Comments</th>
                <th className="px-4 py-2">Reported At</th>
                <th className="px-4 py-2">Is Blocked?</th>
                <th className="px-4 py-2">Block/Unblock</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report) => (
                <tr key={report._id} className="bg-gray-100 dark:bg-gray-700">
                  <td className="border px-4 py-2">{report.postId}</td>
                  <td className="border px-4 py-2">
                    <div>
                     { report.postDetails.images[0] && <img src={report.postDetails?.images[0]} alt="Post" className="w-32 h-w-32 object-cover"/> }
                      <p>Caption :{report.postDetails.captions}</p>
                      <p>Username: {report.postDetails.username}</p>
                    </div>
                  </td>
                  <td className="border px-4 py-2">{report.reporterUsername}</td>
                  <td className="border px-4 py-2">{report.reason}</td>
                  <td className="border px-4 py-2">{report.comments}</td>
                  <td className="border px-4 py-2">{new Date(report.createdAt).toLocaleString()}</td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">
                    {report.postDetails.isBlocked ? "Yes" : "No"}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600 justify-center items-center ">
                    <button
                      onClick={() => confirmBlockUnblock(report.postId, report.postDetails.isBlocked)}
                      className={`px-4 py-2 rounded justify-center items-center ${
                        report.postDetails.isBlocked ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-red-700"
                      } text-white`}
                    >
                      {report.postDetails.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            className="flex justify-center mt-4"
            previousClassName="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-l-md hover:bg-gray-300 dark:hover:bg-gray-600"
            nextClassName="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-600"
            pageClassName="px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            activeClassName="bg-gray-400 dark:bg-gray-600"
          />
        </div>
      </div>
    </main>
  );
}

export default AdminReportManagementComponent;
