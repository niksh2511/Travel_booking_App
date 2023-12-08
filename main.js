$(document).ready(async function () {
  const destinationData = await fetch("./destination.json").then((response) =>
    response.json()
  );
  const sourceData = await fetch("./source.json").then((response) =>
    response.json()
  );
  let flightsData = await fetch("./flights.json").then((response) =>
    response.json()
  );

  console.log(flightsData)

  function userBooking() {
    const container = $("#selection");

    // destination dropdown
    const destinationDropdown = $("#Destination");
    destinationData.forEach((des) => {
      const option = $("<option>");
      option.val(des.id);
      option.text(des.name);
      destinationDropdown.append(option);
    });

    // source dropdown
    const sourceDropdown = $("#Source");
    sourceData.forEach((source) => {
      const option = $("<option>");
      option.val(source.id);
      option.text(source.name);
      sourceDropdown.append(option);
    });
  }

  // Function to search for flights
  function searchFlights() {
    const sourceId = $("#Source").val();
    const destinationId = $("#Destination").val();
    const searchInput = $("#searchInput").val().toLowerCase();

    // Filter flights based on source, destination, and search input
    const matchingFlights = flightsData.filter(flight =>
        flight.sourceID == sourceId && flight.destinationID == destinationId &&
        (flight.name.trim().toLowerCase().includes(searchInput) ||
         flight.departureDate.includes(searchInput))
    );
    
    // Display the matching flights
    displayFlights(matchingFlights);
  }


  // Function to display flights
function displayFlights(flights) {
    const flightResultsContainer = $("#searchResults");
    flightResultsContainer.empty(); // Clear previous results

    if (flights.length === 0) {
        flightResultsContainer.append('<p>No flights found for the selected route.</p>');
        return;
    }

    const resultList = $("<ul>");
    flights.forEach(flight => {
        const listItem = $("<li>");
        listItem.text(`${flight.name} - Price: $${flight.price} - Departure Date: ${flight.departureDate}`);
        resultList.append(listItem);
    });

    flightResultsContainer.append(resultList);
}


  $("#searchButton").on("click", function () {
    searchFlights();
  });

  userBooking();
});
