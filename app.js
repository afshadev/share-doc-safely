const FUNC_ENDPOINT = "saas-token-func-hfd5h8gta2ftaqfs.eastus-01.azurewebsites.net"; // replace

document.getElementById("btn").onclick = async () => {
  const f = document.getElementById("file").files[0];
  if (!f) return alert("Pick a file");

  // 1) Request SAS from your Function
  const r = await fetch(`${FUNC_ENDPOINT}?blobName=${encodeURIComponent(f.name)}`);
  if (!r.ok) return alert("Failed to get SAS");
  const { uploadUrl } = await r.json();

  // 2) Upload directly to Blob (simple PUT, SDK not required)
  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "Content-Type": f.type || "application/octet-stream"
    },
    body: f
  });

  if (!put.ok) {
    const txt = await put.text();
    console.error(txt);
    return alert("Upload failed: " + put.status);
  }
  alert("Upload complete");
};
