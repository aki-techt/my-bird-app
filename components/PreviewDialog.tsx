// プレビューDialog
'use client';
import * as Dialog from '@radix-ui/react-dialog';

export default function PreviewDialog({
  open,
  onOpenChange,
  text,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  text: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="mb-2 text-base font-semibold">LLM 判定プレビュー（モック）</Dialog.Title>
          <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">{text}</p>
          <div className="mt-6 text-right">
            <button
              className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              閉じる
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
