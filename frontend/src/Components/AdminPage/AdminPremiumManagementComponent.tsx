import React, { useEffect, useState } from "react";
import { fetchAllPremiumAccountData } from "../../API/Admin/admin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { PremiumAccountInterface } from "../../Types/userProfile";

const AdminPremiumManagementComponent: React.FC = () => {
  const [premiumAccounts, setPremiumAccounts] = useState<PremiumAccountInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [accountsPerPage] = useState(5);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getPremiumAccountData = async () => {
    try {
      const response = await fetchAllPremiumAccountData();
      console.log("resp: ", response.premiumAccountRequests)
      if (response) {
        setPremiumAccounts(response.premiumAccountRequests);
      } else {
        toast.error("Failed to fetch premium account data");
      }
    } catch (error) {
      console.error("Error fetching premium account data:", error);
      toast.error("An error occurred while fetching premium account data");
    }
  };

  useEffect(() => {
    getPremiumAccountData();
  }, []);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const ImageModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg max-w-4xl w-full">
          <img src={imageUrl} alt="Large Image" className="max-w-full h-auto" />
          <button onClick={onClose} className="block mt-4 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    );
  };

  const offset = currentPage * accountsPerPage;
  const currentAccounts = premiumAccounts.slice(offset, offset + accountsPerPage);
  const pageCount = Math.ceil(premiumAccounts.length / accountsPerPage);

  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar flex flex-col">
        <h1 className="text-center text-xl font-semibold mb-4">Premium Account Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Is Premium</th>
                <th className="px-4 py-2">Premium Expires At</th>
                <th className="px-4 py-2">Payment Details</th>
                <th className="px-4 py-2">Is Requested</th>
                <th className="px-4 py-2">Is Admin Approved</th>
                <th className="px-4 py-2">Documents</th>
              </tr>
            </thead>
            <tbody>
              {currentAccounts.map((account) => (
                <tr key={account._id} className="bg-gray-100 dark:bg-gray-700">
                  <td className="border px-4 py-2">{account.userId}</td>
                  <td className="border px-4 py-2">{account.isPremium ? 'Yes' : 'No'}</td>
                  <td className="border px-4 py-2">{account.premiumExpiresAt ? new Date(account.premiumExpiresAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="border px-4 py-2">{account.paymentDetails || 'N/A'}</td>
                  <td className="border px-4 py-2">{account.premiumRequest.isRequested ? 'Yes' : 'No'}</td>
                  <td className="border px-4 py-2">{account.premiumRequest.isAdminApproved ? 'Yes' : 'No'}</td>
                  <td className="border px-4 py-2">
                    {account.premiumRequest.documents.length > 0 ? (
                      account.premiumRequest.documents.map((doc, index) => (
                        <div key={index} className="mb-2">
                          <p><strong>Type:</strong> {doc.type}</p>
                          {doc.image.map((img, imgIndex) => (
                            <img key={imgIndex} src={img} alt={`Document ${index + 1}`} className="w-32 h-32 object-cover m-1 border border-gray-300 rounded cursor-pointer" onClick={() => openModal(img)} />
                          ))}
                        </div>
                      ))
                    ) : (
                      'No documents'
                    )}
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
      
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
    </main>
  );
}

export default AdminPremiumManagementComponent;
