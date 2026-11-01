(function () {
  const CFG = window.RL_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Données ---------- */
  const GROUPS = [
    { id: "studio", fr: "Studio", en: "Studio" },
    { id: "maternity", fr: "Maternité", en: "Maternity" },
    { id: "outside", fr: "Hors studio", en: "On location" }
  ];

  const SHOOTS = [
    { id: "portrait", group: "studio", min: 100, max: 100,
      fr: ["Portrait", "1 h de shooting · 1 personne"],
      en: ["Portrait", "1-hour shoot · 1 person"] },
    { id: "birthday", group: "studio", min: 140, max: 140,
      fr: ["Anniversaire / Créatif", "1 h de shooting créatif à thème · 1 personne"],
      en: ["Birthday / Creative", "1-hour themed creative shoot · 1 person"] },
    { id: "duo", group: "studio", min: 150, max: 150,
      fr: ["Duo / Petit groupe", "1 h de shooting · 2 à 4 personnes"],
      en: ["Duo / Small group", "1-hour shoot · 2 to 4 people"] },
    { id: "large", group: "studio", min: 160, max: 220,
      fr: ["Grand groupe", "1 h de shooting · plus de 4 personnes, prix selon la taille du groupe"],
      en: ["Large group", "1-hour shoot · more than 4 people, price depends on group size"] },
    { id: "maternitySolo", group: "maternity", min: 100, max: 100,
      fr: ["Maternité solo", "1 h de shooting · future maman"],
      en: ["Maternity solo", "1-hour shoot · mum-to-be"] },
    { id: "maternityFamily", group: "maternity", min: 150, max: 150,
      fr: ["Maternité couple / famille", "1 h de shooting · avec ton/ta partenaire ou ta famille"],
      en: ["Maternity couple / family", "1-hour shoot · with your partner or family"] },
    { id: "event", group: "outside", min: 250, max: 250,
      fr: ["Petit événement", "Demande en mariage, baptême, anniversaire… sur le lieu de ton choix"],
      en: ["Small event", "Proposal, baptism, birthday… at the place of your choice"] },
    { id: "wedding", group: "outside", quote: true,
      fr: ["Mariage", "Civil, coutumier ou religieux · devis personnalisé"],
      en: ["Wedding", "Civil, traditional or religious · custom quote"] }
  ];

  const EXTRAS = [
    { id: "outside", price: 50, notFor: ["event", "wedding"],
      fr: ["Shooting en extérieur", "Frais de déplacement"], en: ["Outdoor shoot", "Travel fee"] },
    { id: "photos", price: 5, qty: true,
      fr: ["Photos retouchées en plus", "par photo"], en: ["Extra edited photos", "per photo"] },
    { id: "time", price: 50, hours: true,
      fr: ["Heure en plus", "Choisie avec la durée du shooting"], en: ["Extra hour", "Picked with the shoot length"] },
    { id: "assistant", price: 50,
      fr: ["Assistant(e) créatif(ve)", "Aide au stylisme et à la mise en place"], en: ["Creative assistant", "Help with styling and set-up"] },
    { id: "makeup", price: 70,
      fr: ["Maquilleuse", "Mise en beauté avant le shooting"], en: ["Makeup artist", "Makeup before the shoot"] },
    { id: "flowers", price: 30, from: true,
      fr: ["Location de bouquet", "Selon le bouquet choisi"], en: ["Bouquet rental", "Depends on the bouquet"] }
  ];

  const T = {
    fr: {
      from: "à partir de", included: "incluse", hoursLine: "Heure en plus", msgDuration: "Durée", quote: "Sur devis", choose: "Choisir", chosen: "Choisi", each: "/ photo",
      book: "Réserver", perPhoto: "par photo", people: "pers.",
      noteRange: "Le prix exact du grand groupe dépend du nombre de personnes.",
      noteTravel: "Déplacement possible selon le lieu (50 €).",
      noteFlowers: "Le prix du bouquet dépend du modèle choisi.",
      noteQuote: "Je t'envoie un devis personnalisé.",
      pickFirst: "Choisis ta séance pour voir le total.",
      s5wedding: "Ta demande de devis",
      sendIntroWedding: "Envoie-moi ta demande, je te réponds avec un devis.",
      sendIntroNoCal: "Envoie-moi ta demande, je te réponds avec mes disponibilités.",
      viaWa: "Envoyer sur WhatsApp", viaMail: "Envoyer par e-mail", viaIg: "Envoyer en DM Instagram",
      msgHello: "Bonjour Ruth, je souhaite réserver un shooting.",
      msgShoot: "Séance", msgPeople: "Personnes", msgOcc: "Occasion", msgCer: "Cérémonies",
      msgDate: "Date", msgPlace: "Lieu", msgExtras: "Suppléments", msgTotal: "Total estimé",
      msgName: "Nom", msgEmail: "E-mail", msgPhone: "Téléphone", msgNotes: "Notes",
      occ: { proposal: "Demande en mariage", baptism: "Baptême", birthday: "Anniversaire", other: "Autre" },
      cer: { civil: "Mariage civil", traditional: "Mariage coutumier", religious: "Mariage religieux" }
    },
    en: {
      from: "from", included: "included", hoursLine: "Extra hour", msgDuration: "Length", quote: "Custom quote", choose: "Choose", chosen: "Selected", each: "/ photo",
      book: "Book", perPhoto: "per photo", people: "ppl",
      noteRange: "The exact large-group price depends on the number of people.",
      noteTravel: "A travel fee (€50) may apply depending on the place.",
      noteFlowers: "The bouquet price depends on the model.",
      noteQuote: "I'll send you a custom quote.",
      pickFirst: "Pick your session to see the total.",
      s5wedding: "Your quote request",
      sendIntroWedding: "Send me your request and I'll reply with a quote.",
      sendIntroNoCal: "Send me your request and I'll reply with my availability.",
      viaWa: "Send on WhatsApp", viaMail: "Send by email", viaIg: "Send as Instagram DM",
      msgHello: "Hi Ruth, I'd like to book a shoot.",
      msgShoot: "Session", msgPeople: "People", msgOcc: "Occasion", msgCer: "Ceremonies",
      msgDate: "Date", msgPlace: "Place", msgExtras: "Extras", msgTotal: "Estimated total",
      msgName: "Name", msgEmail: "Email", msgPhone: "Phone", msgNotes: "Notes",
      occ: { proposal: "Proposal", baptism: "Baptism", birthday: "Birthday party", other: "Other" },
      cer: { civil: "Civil wedding", traditional: "Traditional ceremony", religious: "Religious ceremony" }
    }
  };

  const EN = {
    "nav.shoots": "Sessions", "nav.extras": "Extras", "nav.info": "Info", "nav.book": "Book",
    "hero.quote": "“One beautifully framed glimpse at a time”",
    "hero.lead": "Portraits, birthdays, maternity, groups, events and weddings, 30 minutes from Brussels. Pick your session, see my availability and lock in your slot.",
    "hero.cta": "Book my shoot", "hero.cta2": "See the prices",
    "shoots.title": "Sessions", "shoots.sub": "Every studio session includes a 1-hour shoot, 10 edited photos and all the unedited (raw) photos.",
    "extras.title": "Extras", "extras.sub": "Add them to any session, right in the booking.",
    "info.title": "Good to know",
    "info.s1": "Pick your session, your extras and a slot among my available times.",
    "info.s2": "Your slot is blocked in my calendar while I wait for your deposit.",
    "info.s3": "You pay a 50% deposit by bank transfer within 24 hours (a QR code makes it quick). Once it arrives, I confirm your session. Without it, the request is cancelled.",
    "info.s4": "On the day, please arrive 15 minutes early.",
    "book.title": "Book", "book.sub": "The total updates as you fill in the form.",
    "f.s1": "Your session", "f.s2": "Details", "f.s3": "Extras", "f.optional": "optional", "f.s4": "Your contact", "f.s5": "Your slot",
    "f.duration": "Shoot length", "f.people": "Number of people", "f.occasion": "What's the occasion?", "f.choose": "Choose…",
    "occ.proposal": "Proposal", "occ.baptism": "Baptism", "occ.birthday": "Birthday party", "occ.other": "Other",
    "f.occOther": "Describe the occasion", "f.ceremony": "Which ceremonies? (one or more)",
    "cer.civil": "Civil wedding", "cer.traditional": "Traditional ceremony", "cer.religious": "Religious ceremony",
    "f.weddingDate": "Wedding date", "f.location": "Place (address or town)",
    "f.travelNote": "Outside the studio, a travel fee (€50) may apply depending on the place. I'll confirm it after you book.",
    "f.weddingNote": "For weddings, I'll send you a custom quote based on the ceremonies and the place.",
    "f.name": "Full name", "f.email": "Email", "f.phone": "Phone / WhatsApp", "f.notes": "Anything else? (theme, outfits, ideas…)",
    "f.slotIntro": "Only my free days and times are shown. The slot you pick is blocked for you.",
    "f.openCal": "See my availability",
    "f.copied": "Message copied. Paste it into the Instagram chat.",
    "f.done": "Your request is saved and your slot is blocked. Pay the deposit now: I confirm your session as soon as it arrives. Without a transfer within 24 hours, the request is cancelled.",
    "f.depositNote": "Important: your booking is only confirmed once the 50% deposit arrives, paid by bank transfer within 24 hours. Without it, it is cancelled.",
    "sum.deposit": "50% deposit within 24 h",
    "f.iban": "Account for the transfer",
    "pay.amount": "Amount", "pay.payee": "Payee", "pay.ref": "Reference", "pay.copy": "Copy",
    "pay.help": "Scan the QR code with your banking app: the transfer is pre-filled. On your phone, copy the details.",
    "pay.range": "For a large group, this is the minimum deposit. I'll confirm the exact amount based on the number of people.",
    "err.shoot": "Pick a session.", "err.people": "Tell me how many people.", "err.occasion": "Tell me the occasion.",
    "err.ceremony": "Pick at least one ceremony.", "err.date": "Pick a date.",
    "err.location": "Tell me the place, the travel fee depends on it.", "err.name": "Tell me your name.",
    "err.email": "Enter a valid email, the confirmation is sent there.",
    "sum.title": "Your booking", "sum.total": "Estimated total",
    "sum.fine": "The deposit is paid by bank transfer within 24 hours. Your session is confirmed once it arrives, otherwise the request is cancelled. The rest is paid on the day of the shoot.",
    "mb.go": "My slot",
    "foot.thanks": "Thank you for your trust",
    "foot.verse": "Colossians 3:23 · “Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.”"
  };

  /* ---------- Langue ---------- */
  let lang = "fr";
  try { if (localStorage.getItem("rl-lang") === "en") lang = "en"; } catch (e) {}
  const FR = {};
  $$("[data-i18n]").forEach(el => { FR[el.dataset.i18n] = el.textContent; });
  const t = k => T[lang][k];
  const L = o => o[lang];

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => {
      const k = el.dataset.i18n;
      el.textContent = lang === "en" ? (EN[k] ?? FR[k]) : FR[k];
    });
    $("#lang").textContent = lang === "fr" ? "EN" : "FR";
    $("#lang").setAttribute("aria-label", lang === "fr" ? "English" : "Français");
    renderPackages(); renderExtrasList(); renderChoices(); renderHours(); renderExtraRows(); update();
  }
  $("#lang").addEventListener("click", () => {
    lang = lang === "fr" ? "en" : "fr";
    try { localStorage.setItem("rl-lang", lang); } catch (e) {}
    applyLang();
  });

  /* ---------- Formatage ---------- */
  const eur = n => lang === "fr" ? `${n} €` : `€${n}`;
  const range = (a, b) => a === b ? eur(a) : (lang === "fr" ? `${a} – ${b} €` : `€${a}–${b}`);
  const priceOf = s => s.quote ? t("quote") : range(s.min, s.max);

  /* ---------- État ---------- */
  const state = { shoot: null, extras: {}, photos: 0, hours: 0 };
  const MAX_EXTRA_HOURS = 3;
  const shoot = () => SHOOTS.find(s => s.id === state.shoot);

  /* ---------- Rendu vitrine ---------- */
  function renderPackages() {
    $("#packages").innerHTML = GROUPS.map(g => `
      <div class="pkg-group">
        <h3 class="pkg-group-title">${L(g)}</h3>
        <div class="pkg-grid">
          ${SHOOTS.filter(s => s.group === g.id).map(s => `
            <article class="pkg">
              <h4>${L(s)[0]}</h4>
              <p>${L(s)[1]}</p>
              <div class="pkg-foot">
                <span class="tag">${priceOf(s)}</span>
                <a href="#reserver" class="link" data-pick="${s.id}">${t("book")}</a>
              </div>
            </article>`).join("")}
        </div>
      </div>`).join("");
  }

  function renderExtrasList() {
    $("#extrasList").innerHTML = EXTRAS.map(x => `
      <li><span>${L(x)[0]}</span><b>${x.from ? t("from") + " " : ""}${eur(x.price)}${x.qty ? " " + t("each") : ""}${x.hours ? " / h" : ""}</b></li>`).join("");
  }

  function renderGallery() {
    const imgs = CFG.gallery || [];
    $("#gallery").innerHTML = imgs.map(g => {
      const { src, alt = "", wide } = typeof g === "string" ? { src: g } : g;
      return `<figure${wide ? ' class="wide"' : ""}><img src="${src}" alt="${alt}" loading="lazy" decoding="async"></figure>`;
    }).join("");
    $("#gallery").hidden = !imgs.length;
  }

  /* ---------- Rendu formulaire ---------- */
  function renderChoices() {
    $("#choices").innerHTML = GROUPS.map(g => `
      <p class="choice-group">${L(g)}</p>
      ${SHOOTS.filter(s => s.group === g.id).map(s => `
        <label class="choice">
          <input type="radio" name="shoot" value="${s.id}" ${state.shoot === s.id ? "checked" : ""}>
          <span class="choice-name">${L(s)[0]}</span>
          <span class="choice-price">${priceOf(s)}</span>
        </label>`).join("")}`).join("");
  }

  function renderHours() {
    const s = shoot();
    const base = s && s.id === "event" ? 2 : 1;
    $("#hoursPills").innerHTML = Array.from({ length: MAX_EXTRA_HOURS + 1 }, (_, n) => `
      <label class="pill">
        <input type="radio" name="hours" value="${n}" ${state.hours === n ? "checked" : ""}>
        <span>${base + n} h <small>${n ? "+" + eur(n * 50) : t("included")}</small></span>
      </label>`).join("");
  }

  function renderExtraRows() {
    $("#extraRows").innerHTML = EXTRAS.filter(x => !x.hours).map(x => {
      const label = `<span class="x-name">${L(x)[0]}<small>${L(x)[1]}</small></span>`;
      const price = `<span class="x-price">${x.from ? t("from") + " " : ""}${eur(x.price)}${x.qty ? " " + t("each") : ""}</span>`;
      if (x.qty) return `
        <div class="x-row" data-x="${x.id}">
          ${label}${price}
          <div class="stepper">
            <button type="button" data-step="-1" aria-label="−">−</button>
            <output id="photosQty">${state.photos}</output>
            <button type="button" data-step="1" aria-label="+">+</button>
          </div>
        </div>`;
      return `
        <label class="x-row" data-x="${x.id}">
          ${label}${price}
          <input type="checkbox" class="switch" name="x-${x.id}" ${state.extras[x.id] ? "checked" : ""}>
        </label>`;
    }).join("");
  }

  /* ---------- Calcul ---------- */
  function compute() {
    const s = shoot();
    if (!s) return null;
    const lines = [{ label: L(s)[0], value: priceOf(s) }];
    let min = s.min || 0, max = s.max || 0, from = false;
    EXTRAS.forEach(x => {
      if (x.notFor && x.notFor.includes(s.id)) return;
      if (x.hours) {
        if (state.hours > 0) {
          const v = state.hours * x.price;
          lines.push({ label: `${t("hoursLine")} × ${state.hours}`, value: eur(v) });
          min += v; max += v;
        }
      } else if (x.qty) {
        if (state.photos > 0) {
          const v = state.photos * x.price;
          lines.push({ label: `${L(x)[0]} × ${state.photos}`, value: eur(v) });
          min += v; max += v;
        }
      } else if (state.extras[x.id]) {
        lines.push({ label: L(x)[0], value: (x.from ? t("from") + " " : "") + eur(x.price) });
        min += x.price; max += x.price;
        if (x.from) from = true;
      }
    });
    const notes = [];
    let total;
    if (s.quote) { total = t("quote"); notes.push(t("noteQuote")); }
    else {
      total = (from ? t("from") + " " : "") + (from ? eur(min) : range(min, max));
      if (s.id === "large") notes.push(t("noteRange"));
      if (s.id === "event") notes.push(t("noteTravel"));
      if (from) notes.push(t("noteFlowers"));
    }
    // acompte : la moitié du total (pour une fourchette, la moitié de chaque borne)
    const half = n => Math.round(n / 2);
    const deposit = s.quote ? null : (from ? t("from") + " " + eur(half(min)) : range(half(min), half(max)));
    return { lines, total, notes, deposit, depositAmount: s.quote ? 0 : half(min), depositRange: !s.quote && min !== max };
  }

  /* ---------- Mise à jour ---------- */
  function update() {
    const s = shoot();
    const active = new Set();
    if (s) {
      active.add(s.id);
      active.add(s.group === "outside" ? s.id : "studio");
      if (state.extras.outside && !(s.id === "event" || s.id === "wedding")) active.add("outside");
    }
    $$(".cond").forEach(el => {
      el.hidden = !el.dataset.show.split(" ").some(k => active.has(k));
    });
    $("#occOtherField").hidden = !(s && s.id === "event" && $("#occasion").value === "other");

    $$("#extraRows .x-row").forEach(row => {
      const x = EXTRAS.find(e => e.id === row.dataset.x);
      row.hidden = !!(s && x.notFor && x.notFor.includes(s.id));
    });

    const c = compute();
    $("#sumLines").innerHTML = c
      ? c.lines.map(l => `<li><span>${l.label}</span><b>${l.value}</b></li>`).join("")
      : `<li class="muted">${t("pickFirst")}</li>`;
    $("#sumTotal").textContent = c ? c.total : eur(0);
    $("#mobileTotal").textContent = c ? c.total : eur(0);
    $("#sumNote").textContent = c ? c.notes.join(" ") : "";
    $("#sumDepositRow").hidden = !(c && c.deposit);
    $("#sumDeposit").textContent = c && c.deposit ? c.deposit : "";

    const wedding = s && s.quote;
    const hasCal = !!calUser();
    $("#s5label").textContent = wedding ? t("s5wedding") : (lang === "en" ? EN["f.s5"] : FR["f.s5"]);
    $("#slotIntro").hidden = wedding || !hasCal;
    $("#depositNote").hidden = wedding || !hasCal;
    $("#depositNote + [data-iban]").hidden = wedding || !hasCal || !CFG.iban;
    $("#openCal").hidden = wedding || !hasCal || !$("#calWrap").hidden || !$("#done").hidden;
    $("#sendWrap").hidden = !(wedding || !hasCal);
    $("#sendIntro").textContent = wedding ? t("sendIntroWedding") : t("sendIntroNoCal");
    renderSendButtons();
  }

  /* ---------- Validation ---------- */
  function validate() {
    const s = shoot();
    const errs = new Set();
    const val = id => $("#" + id).value.trim();
    if (!s) errs.add("shoot");
    else {
      if (["duo", "large", "maternityFamily"].includes(s.id) && !(+val("people") > 0)) errs.add("people");
      if (s.id === "event") {
        if (!val("occasion")) errs.add("occasion");
        else if (val("occasion") === "other" && !val("occasionOther")) errs.add("occasionOther");
      }
      if (s.id === "wedding") {
        if (!$$('input[name="ceremony"]:checked').length) errs.add("ceremony");
        if (!val("weddingDate")) errs.add("weddingDate");
      }
      if ((s.id === "event" || s.id === "wedding" || state.extras.outside) && !val("location")) errs.add("location");
    }
    if (!val("name")) errs.add("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email"))) errs.add("email");

    $$("[data-err]").forEach(e => e.classList.toggle("show", errs.has(e.dataset.err)));
    if (errs.size) {
      const first = $$("[data-err]").find(e => errs.has(e.dataset.err) && !e.closest("[hidden]"));
      if (first) first.closest(".step").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return !errs.size;
  }

  /* ---------- Message récapitulatif ---------- */
  function message() {
    const s = shoot(); const c = compute(); const v = id => $("#" + id).value.trim();
    const out = [t("msgHello"), ""];
    out.push(`${t("msgShoot")} : ${L(s)[0]} (${priceOf(s)})`);
    if (!s.quote) out.push(`${t("msgDuration")} : ${baseMinutes(s) / 60 + state.hours} h`);
    if (v("people") && !$("#people").closest("[hidden]")) out.push(`${t("msgPeople")} : ${v("people")}`);
    if (s.id === "event") out.push(`${t("msgOcc")} : ${v("occasion") === "other" ? v("occasionOther") : t("occ")[v("occasion")]}`);
    if (s.id === "wedding") {
      out.push(`${t("msgCer")} : ${$$('input[name="ceremony"]:checked').map(i => t("cer")[i.value]).join(", ")}`);
      out.push(`${t("msgDate")} : ${v("weddingDate")}`);
    }
    if (v("location") && !$("#location").closest("[hidden]")) out.push(`${t("msgPlace")} : ${v("location")}`);
    const extras = c.lines.slice(1);
    if (extras.length) out.push(`${t("msgExtras")} : ${extras.map(l => `${l.label} (${l.value})`).join(", ")}`);
    out.push(`${t("msgTotal")} : ${c.total}`);
    out.push("", `${t("msgName")} : ${v("name")}`, `${t("msgEmail")} : ${v("email")}`);
    if (v("phone")) out.push(`${t("msgPhone")} : ${v("phone")}`);
    if (v("notes")) out.push(`${t("msgNotes")} : ${v("notes")}`);
    return out.join("\n");
  }

  /* ---------- Envoi par message (mariage, ou agenda pas branché) ---------- */
  function renderSendButtons() {
    const b = [];
    if (CFG.whatsapp) b.push(`<button type="button" class="btn" data-send="wa">${t("viaWa")}</button>`);
    if (CFG.email) b.push(`<button type="button" class="btn btn-ghost" data-send="mail">${t("viaMail")}</button>`);
    if (CFG.instagram) b.push(`<button type="button" class="btn ${b.length ? "btn-ghost" : ""}" data-send="ig">${t("viaIg")}</button>`);
    $("#sendBtns").innerHTML = b.join("");
  }

  $("#sendBtns").addEventListener("click", async e => {
    const btn = e.target.closest("[data-send]");
    if (!btn || !validate()) return;
    const msg = message();
    if (btn.dataset.send === "wa") window.open(`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    if (btn.dataset.send === "mail") {
      const subj = (lang === "fr" ? "Réservation shooting · " : "Shoot booking · ") + L(shoot())[0];
      location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(msg)}`;
    }
    if (btn.dataset.send === "ig") {
      try { await navigator.clipboard.writeText(msg); $("#copied").hidden = false; } catch (err) {}
      window.open(`https://ig.me/m/${CFG.instagram}`, "_blank");
    }
  });

  /* ---------- Paiement de l'acompte ---------- */
  const ascii = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "");
  const payData = {};

  function showPayment(dateText) {
    const c = compute();
    if (!c || !c.depositAmount || !CFG.iban) return;
    const amount = c.depositAmount.toFixed(2);
    const ref = ascii(`Acompte ${L(shoot())[0]} ${$("#name").value.trim()}${dateText ? " " + dateText : ""}`).slice(0, 140);
    Object.assign(payData, { payAmountRaw: amount, payIbanRaw: CFG.iban.replace(/\s/g, ""), payRef: ref });
    $("#payAmount").textContent = eur(c.depositAmount);
    $("#payPayee").textContent = CFG.payee || "";
    $("#payIban").textContent = CFG.iban;
    $("#payRef").textContent = ref;
    $("#payRange").hidden = !c.depositRange;
    if (window.qrcode) {
      const epc = ["BCD", "002", "1", "SCT", "", ascii(CFG.payee || ""), payData.payIbanRaw, "EUR" + amount, "", "", ref].join("\n");
      const qr = qrcode(0, "M");
      qr.addData(epc);
      qr.make();
      $("#payQr").innerHTML = qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
    }
    $("#pay").hidden = false;
  }

  $("#pay").addEventListener("click", async e => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    try {
      await navigator.clipboard.writeText(payData[b.dataset.copy] || $("#" + b.dataset.copy).textContent);
      b.classList.add("ok");
      setTimeout(() => b.classList.remove("ok"), 1500);
    } catch (err) {}
  });

  /* ---------- Agenda Cal.com ---------- */
  // ?cal=utilisateur/evenement permet de tester l'agenda avant que Ruth ait son compte
  const testCal = new URLSearchParams(location.search).get("cal");
  const calUser = () => testCal ? testCal.split("/")[0] : CFG.calUsername;
  // chaque heure en plus allonge la réservation : Cal.com ne propose alors que les créneaux où la séance tient avant la fin de journée
  const baseMinutes = s => s.id === "event" ? 120 : 60;
  const calLink = s => {
    const link = testCal || `${CFG.calUsername}/${(CFG.calEvents || {})[s.id]}`;
    return state.hours && !testCal ? `${link}?duration=${baseMinutes(s) + 60 * state.hours}` : link;
  };

  function loadCalScript() {
    if (window.Cal) return;
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
  }

  let calCount = 0;
  function openCalendar() {
    if (!validate()) return;
    loadCalScript();
    const ns = "rl" + (++calCount);
    $("#cal").innerHTML = "";
    $("#calWrap").hidden = false;
    $("#openCal").hidden = true;
    Cal("init", ns, { origin: "https://cal.com" });
    Cal.ns[ns]("inline", {
      elementOrSelector: "#cal",
      calLink: calLink(shoot()),
      config: {
        layout: "month_view",
        theme: "light",
        name: $("#name").value.trim(),
        email: $("#email").value.trim(),
        notes: message()
      }
    });
    Cal.ns[ns]("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: { light: { "cal-brand": CFG.calBrand || "#111111" } }
    });
    Cal.ns[ns]("on", {
      action: "bookingSuccessful",
      callback: e => {
        const d = e && e.detail && e.detail.data;
        const start = d && (d.startTime || (d.booking && d.booking.startTime) || d.date);
        const when = start && !isNaN(new Date(start)) ? new Date(start).toLocaleDateString("fr-BE", { day: "2-digit", month: "2-digit" }) : "";
        $("#done").hidden = false;
        showPayment(when);
        $("#done").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    $("#slotStep").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $("#openCal").addEventListener("click", openCalendar);

  function resetCalendar() {
    if ($("#calWrap").hidden) return;
    $("#calWrap").hidden = true;
    $("#cal").innerHTML = "";
    $("#done").hidden = true;
  }

  /* ---------- Évènements ---------- */
  const form = $("#form");
  form.addEventListener("submit", e => e.preventDefault());

  form.addEventListener("change", e => {
    if (e.target.name === "shoot") { state.shoot = e.target.value; resetCalendar(); renderHours(); }
    if (e.target.name === "hours") { state.hours = +e.target.value; resetCalendar(); }
    if (e.target.name && e.target.name.startsWith("x-")) state.extras[e.target.name.slice(2)] = e.target.checked;
    if (["shoot", "people", "occasion", "location"].includes(e.target.name) || e.target.name?.startsWith("x-")) resetCalendar();
    const err = e.target.closest(".field, .step, .sub")?.querySelector(".err.show");
    if (err) err.classList.remove("show");
    update();
  });
  form.addEventListener("input", e => {
    const err = e.target.closest(".field")?.querySelector(".err.show");
    if (err) err.classList.remove("show");
  });

  $("#extraRows").addEventListener("click", e => {
    const b = e.target.closest("[data-step]");
    if (!b) return;
    state.photos = Math.max(0, Math.min(50, state.photos + +b.dataset.step));
    $("#photosQty").textContent = state.photos;
    resetCalendar();
    update();
  });

  document.addEventListener("click", e => {
    const a = e.target.closest("[data-pick]");
    if (!a) return;
    state.shoot = a.dataset.pick;
    resetCalendar();
    renderChoices();
    renderHours();
    update();
  });

  // date du mariage : pas dans le passé
  $("#weddingDate").min = new Date().toISOString().slice(0, 10);

  // barre mobile visible seulement autour du formulaire
  const io = new IntersectionObserver(([en]) => $("#mobileBar").classList.toggle("on", en.isIntersecting), { threshold: 0.05 });
  io.observe($("#reserver"));

  renderGallery();
  if (CFG.iban) $$("[data-iban]").forEach(el => { el.querySelector("b").textContent = CFG.iban; el.hidden = false; });
  applyLang();
})();
