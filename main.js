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



    userBooking()
})