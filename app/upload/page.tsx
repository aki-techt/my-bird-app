import UploadDropzone from '@/components/UploadDropzone';

export default function UploadPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">鳥の写真をアップロード</h1>
      <p className="text-sm text-gray-600">Step1: ダミーAPIで通します。後でFastAPIに切替。</p>
      <UploadDropzone />
    </section>
  );
}