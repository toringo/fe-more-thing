class Bicycle {
  ride() {
    console.log("七星方法");
  }
  getPrice() {
    console.log("价格");
    return 100;
  }
  brake() {
    console.log("刹车");
    return true;
  }
}

class BicycleDecorator {
  constructor(bicycle) {
    this.bicycle = bicycle;
  }
  ride() {
    return this.bicycle.ride();
  }
  getPrice() {
    return this.bicycle.getPrice();
  }
  brake() {
    return this.bicycle.brake();
  }
}

class TailLightDecorator extends BicycleDecorator {
  constructor(bicycle) {
    super(bicycle);
  }
  getPrice() {
    return this.bicycle.getPrice() + 20;
  }
}

console.log(new TailLightDecorator(new Bicycle()).getPrice());
