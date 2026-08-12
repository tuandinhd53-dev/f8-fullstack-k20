// Banner

const params = new URLSearchParams(location.search);
const source = params.get("utm_source");
const campaign = params.get("utm_campaign");
const utmSource = document.querySelector("#utm-source");
const utmCampaign = document.querySelector("#utm-campaign");

utmSource.textContent = source;
utmCampaign.textContent = campaign;
