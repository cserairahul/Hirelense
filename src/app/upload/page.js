import AuthGuard from "../../components/AuthGuard";
import UploadForm from "../../components/UploadForm";

export default function UploadPage() {
  return (
    <AuthGuard>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Upload & Analyze</h2>
        <UploadForm />
      </div>
    </AuthGuard>
  );
}
