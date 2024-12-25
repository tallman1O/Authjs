import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">users</h1>
      <table className="w-full rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-2">user.firstName</td>
            <td className="p-2">user.lastName</td>
            <td className="p-2">
              <button className="px-2 py-1 text-red-500 hover:bg-red-100 rounded focus:outline-none">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
