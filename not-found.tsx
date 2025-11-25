export default function NotFound() {
  return (
    <div className="w-40 px-10 py-4 mt-[-40px] mx-auto mb-0">
      <dl>
        <dt className="text-left">ページが見つかりませんでした</dt>
        <dd className="text-left">
          あなたがアクセスしようとしたページは存在しません。
          <br />
          URLを再度ご確認ください。
        </dd>
      </dl>
    </div>
  );
}
