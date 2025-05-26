import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="flex justify-center mt-12">
      <SignIn
        routing="path"
        path="/login"
        appearance={{
          elements: {
            card: "shadow-lg p-6 rounded-xl border border-gray-200", // overall container
            headerTitle: "text-3xl font-semibold text-center text-gray-800",
            headerSubtitle: "text-md text-center text-gray-500 mb-4",

            formFieldLabel: "text-gray-700 font-medium",
            formFieldInput: "border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500",
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded mt-4",

            footerActionText: "text-sm text-gray-600",
            footerActionLink: "text-indigo-600 hover:underline",
          },
        }}
      />
    </div>
  );
};

export default LoginPage;
