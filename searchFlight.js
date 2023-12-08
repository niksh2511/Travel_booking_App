$(document).ready(async function () {

    const destinationData = await fetch('./destination.json').then((response) => response.json().then((data) => data))

    const sourceData = await fetch('./source.json').then((response) => response.json().then((data) => data))

    const flightsData = await fetch('./flights.json').then((response) => response.json().then((data) => data))


    function userBooking() {
        const container = $("#selection");

        // destination dropdown
        const destinationDropdown = $("#Destination")
        destinationData.forEach(des => {
            const option = $("<option>");
            option.val(des.id);
            option.text(des.name);
            destinationDropdown.append(option)
        });

        // source dropdown
        const sourceDropdown = $("#Source")
        sourceData.forEach(source => {
            const option = $("<option>");
            option.val(source.id);
            option.text(source.name)
            sourceDropdown.append(option)
        })
    }

    function errorMsg(message) {
        const errorMessage = $("#error");
        errorMessage.empty();

        if (message) {
            errorMessage.append(`<p>${message}</p>`)
        }
    }

    // search flights
    function searchFlights() {
        const sourceId = parseInt($("#Source").val());
        const destinationId = parseInt($("#Destination").val());
        const flightSearch = $("#txtSearch").val()
        const searchDate = $("#departureDate").val();



        const matchingFlights = flightsData.filter(flight =>
            {
                const sourceIdMatch = sourceId !== -1 ? flight.sourceID === sourceId : true;
                const destIdMatch = destinationId !== -1 ? flight.destinationID === destinationId : true;
                const flightNameMatch = flight.name.toLowerCase().includes(flightSearch.toLowerCase().trim())
                const departureMatch = flight.departureDate.includes(searchDate.trim())
                // add on

                return (sourceIdMatch && destIdMatch && flightNameMatch && departureMatch)
            });

        return matchingFlights;
    }


    function tableContent(list) {
        const tableBody = $("#flightTableBody");

        tableBody.empty();

        list.forEach(flight => {
            const row = `
                <tr id="item${flight.flightID}">

                    <td>${flight.flightID}</td>
                    <td>${flight.name}</td>
                    <td>${getSourceName(flight.sourceID)}</td>
                    <td>${getDestinationName(flight.destinationID)}</td>
                    <td>${flight.departureDate}</td>
                    <td>$${flight.price}</td>
                    <td>
                        <a href="./files">
                            <button class="book" id="btnBook${flight.flightID}">Book</button>
                        </a>
                    </td>
                </tr>
            `
            tableBody.append(row);
        })
    }

    function getSourceName(sourceId) {
        const source = sourceData.find(s => s.id === sourceId);
        return source ? source.name : 'Not Available';
    }

    function getDestinationName(destinationId) {
        const destination = destinationData.find(d => d.id === destinationId)
        return destination ? destination.name : 'Not Available';
    }


    $("#searchButton").on('click', function (event) {
        event.preventDefault();
        const flightArr = searchFlights();
        
        if (flightArr.length === 0) {
            errorMsg('No flights are available on this route.')
        } else {
            errorMsg(null)
        }

        tableContent(flightArr);
    })

    //searchDates()
    tableContent(flightsData)
    userBooking()
})