export function bestHouse(arr, rowNumber, columnNumber) {
    const arrayLength = arr.length;
    let houseArray = [];
    let minimunDistance = 0;
    let houseArrayLength = 0;
    let positionArray = [];
    // Create an array containing all the houses
    for (let index = 0; index < arrayLength; index++){
        if (arr[index].amenityCode === 2){
            houseArray.push(arr[index]);
            houseArrayLength++;
        }
    }

    //Calculating the total distance for each house and storing it in the array
    for (let indexHouse = 0; indexHouse < houseArrayLength; indexHouse++){
        let distance = 0;
        for (let index = 0; index < arrayLength; index++){
            if(arr[index].amenityCode === 1){
                distance += getDistanceBetweenTwoPoints(arr[index].pos, houseArray[indexHouse].pos)
            }
        }
        houseArray[indexHouse].totalDistance = distance
    }

    //Calculating the minimun distance
    minimunDistance = houseArray[0].totalDistance;
    for (let indexHouse = 0; indexHouse < houseArrayLength; indexHouse++){
        if (houseArray[indexHouse].totalDistance < minimunDistance){
            minimunDistance = houseArray[indexHouse].totalDistance;
        }
    }

    //Creating the best houses array
    for (let indexHouse = 0; indexHouse < houseArrayLength; indexHouse++){
        if (houseArray[indexHouse].totalDistance === minimunDistance){
            positionArray.push(houseArray[indexHouse].pos);
        }
    }
    // console.log(minimunDistance, houseArray);
    return positionArray;
}

function getDistanceBetweenTwoPoints(point_1, point_2){
    return Math.sqrt(((point_1[0] - point_2[0])**2) + ((point_1[1] - point_2[1])**2))
}