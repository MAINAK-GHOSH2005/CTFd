import $ from "jquery";
import CTFd from "../compat/CTFd";
import { ezAlert } from "../compat/ezq";
import "../compat/json";
import "./main";

// API functions for toggling user/team visibility
const api_func = {
  users: (x, y) => CTFd.api.patch_user_public({ userId: x }, y),
  teams: (x, y) => CTFd.api.patch_team_public({ teamId: x }, y),
};

// Toggle visibility of a single account (user or team)
function toggleAccount() {
  const $btn = $(this);
  const id = $btn.data("account-id");
  const state = $btn.data("state");
  let hidden = undefined;
  if (state === "visible") {
    hidden = true;
  } else if (state === "hidden") {
    hidden = false;
  }

  const params = {
    hidden: hidden,
  };

  api_func[CTFd.config.userMode](id, params)
    .then((response) => {
      if (response.success) {
        if (hidden) {
          $btn.data("state", "hidden");
          $btn.addClass("btn-danger").removeClass("btn-success");
          $btn.text("Hidden");
        } else {
          $btn.data("state", "visible");
          $btn.addClass("btn-success").removeClass("btn-danger");
          $btn.text("Visible");
        }
      } else {
        ezAlert({ title: "Error", body: "Failed to update visibility." });
      }
    })
    .catch(() => {
      ezAlert({
        title: "Error",
        body: "Failed to update visibility due to network error.",
      });
    });
}

// Bulk toggle visibility for selected accounts
function toggleSelectedAccounts(selectedAccounts, action) {
  const params = {
    hidden: action === "hidden" ? true : false,
  };
  const reqs = [];
  for (let accId of selectedAccounts.accounts) {
    reqs.push(api_func[CTFd.config.userMode](accId, params));
  }
  for (let accId of selectedAccounts.users) {
    reqs.push(api_func["users"](accId, params));
  }
  Promise.all(reqs)
    .then((_responses) => {
      window.location.reload();
    })
    .catch(() => {
      ezAlert({
        title: "Error",
        body: "Failed to update some accounts due to network error.",
      });
    });
}

function bulkToggleAccounts(_event) {
  const accountIDs = $(".tab-pane.active input[data-account-id]:checked").map(
    function () {
      return $(this).data("account-id");
    }
  );

  const userIDs = $(".tab-pane.active input[data-user-id]:checked").map(
    function () {
      return $(this).data("user-id");
    }
  );

  const selectedUsers = {
    accounts: accountIDs,
    users: userIDs,
  };

  ezAlert({
    title: "Toggle Visibility",
    body: $(`
      <form id="scoreboard-bulk-edit">
        <div class="form-group">
          <label>Visibility</label>
          <select name="visibility" data-initial="">
            <option value="">--</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
      </form>
    `),
    button: "Submit",
    success: function () {
      const data = $("#scoreboard-bulk-edit").serializeJSON(true);
      const state = data.visibility;
      toggleSelectedAccounts(selectedUsers, state);
    },
  });
}

// Function to safely display affiliation only (country removed)
function getAffiliationHTML(entry) {
  let html = "";

  if (entry.affiliation && entry.affiliation.trim() !== "") {
    html += `<span class="badge badge-secondary">${entry.affiliation}</span>`;
  }

  if (html === "") {
    html = '<span class="text-muted">-</span>';
  }

  return html;
}

// Render scoreboard rows inside the table body with id "scoreboard-body"
function renderScoreboard(data) {
  const $tbody = $("#scoreboard-body");
  $tbody.empty();

  if (!data || data.length === 0) {
    $tbody.append(
      '<tr><td colspan="6" class="text-center">No data available.</td></tr>'
    );
    return;
  }

  data.forEach((entry, index) => {
    const medalRankHTML = getMedalOrRank(entry);
    const affiliationHTML = getAffiliationHTML(entry);
    const hiddenBadge = entry.hidden
      ? '<span class="badge badge-danger">hidden</span>'
      : '<span class="badge badge-success">visible</span>';

    // Handle URL generation based on account type
    const accountUrl =
      entry.account_url ||
      `/admin/${entry.account_type === "Teams" ? "teams" : "users"}/${
        entry.account_id
      }`;

    // Handle official badge
    const officialBadge = entry.oauth_id
      ? `<a href="https://majorleaguecyber.org/${
          entry.account_type === "Teams" ? "t" : "u"
        }/${entry.name}">
           <span class="badge badge-primary">Official</span>
         </a>`
      : "";

    const rowHtml = `
      <tr data-href="${accountUrl}">
        <td class="border-right text-center" data-checkbox>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" value="${
              entry.account_id
            }" autocomplete="off" data-account-id="${entry.account_id}">&nbsp;
          </div>
        </td>
        <td class="text-center" width="10%">${medalRankHTML}</td>
        <td>
          <a href="${accountUrl}">${entry.name}</a>
          ${officialBadge}
        </td>
        <td>
          <span class="badge badge-secondary">${
            entry.bracket_name || "No Bracket"
          }</span>
        </td>
        <td>${affiliationHTML}</td>
        <td>${entry.score || 0}</td>
        <td>${hiddenBadge}</td>
      </tr>
    `;
    $tbody.append(rowHtml);
  });

  // Rebind visibility toggle after new rows added
  $(".scoreboard-toggle").off().click(toggleAccount);
}

function updateScoreboard() {
  CTFd.api
    .get_scoreboard()
    .then((response) => {
      if (response.success) {
        renderScoreboard(response.data);
      } else {
        console.error("Failed to load scoreboard data:", response);
        $("#scoreboard-body").html(
          '<tr><td colspan="6" class="text-center text-danger">Failed to load scoreboard data.</td></tr>'
        );
      }
    })
    .catch((error) => {
      console.error("Error loading scoreboard:", error);
      $("#scoreboard-body").html(
        '<tr><td colspan="6" class="text-center text-danger">Error loading scoreboard data.</td></tr>'
      );
    });
}

$(() => {
  updateScoreboard();

  setInterval(updateScoreboard, 30000);

  // Setup toggle buttons and bulk toggle button
  $(document).on("click", ".scoreboard-toggle", toggleAccount);
  $("#scoreboard-edit-button").click(bulkToggleAccounts);
});
