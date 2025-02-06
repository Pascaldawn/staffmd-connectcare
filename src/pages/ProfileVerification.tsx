
import { useState } from "react";
import { ArrowLeft, FileCheck, FileUp, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ProfileVerification() {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles]);
      toast({
        title: "Files added",
        description: `${selectedFiles.length} file(s) added successfully.`
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "File removed",
      description: "Document removed from upload list."
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would upload files to a server
    toast({
      title: "Documents submitted",
      description: "Your documents have been submitted for verification. We'll review them shortly.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home Page
        </Link>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Verification</h1>
            <p className="mt-2 text-gray-600">
              Upload your medical licenses and certifications for verification. This helps maintain the quality and trust of our platform.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <FileUp className="h-12 w-12 text-gray-400" />
                <span className="text-gray-600">Click to upload or drag and drop</span>
                <span className="text-sm text-gray-500">PDF, JPG, or PNG (max 10MB each)</span>
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Selected Documents</h3>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <FileCheck className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-t pt-4">
                <button
                  type="submit"
                  disabled={files.length === 0}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Documents for Verification
                </button>
              </div>
            </form>
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Our team will review your submitted documents</li>
              <li>• You'll receive an email notification about the verification status</li>
              <li>• Once verified, your profile will display a verification badge</li>
              <li>• The process typically takes 1-2 business days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
