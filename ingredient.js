class Ingredients {
  constructor(ingredientSelector) {
    this.ingredient = document.querySelector(ingredientSelector);
    this.offset_x = 0;
    this.offset_y = 0;
    this.object_dragged = false;
    this.defaultPos = this.refresh_object_pos();

    this.ingredient.addEventListener("mousedown", (e) => console.log("Click!"));

    this.ingredient.addEventListener("mousedown", (e) => {
      MOUSE_DOWN = true;
      if (this.object_dragged) return;
      this.object_dragged = true;
      this.ingredient.style.cursor = "grabbing";
      this.ingredient.style.transition = "none";
      this.defaultPos = this.refresh_object_pos();
      this.offset_x = e.clientX - this.ingredient.getBoundingClientRect().left;
      this.offset_y = e.clientY - this.ingredient.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", (e) => {
      if (this.object_dragged && MOUSE_DOWN) {
        this.ingredient.style.left = `${e.clientX - this.offset_x}px`;
        this.ingredient.style.top = `${e.clientY - this.offset_y}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      MOUSE_DOWN = false;
      if (this.object_dragged) {
        this.ingredient.style.cursor = "pointer";
        this.ingredient.style.transition = "left 0.3s ease-out, top 0.3s ease-out";
        console.log(this.defaultPos);
        this.ingredient.style.left = `${this.defaultPos.left}px`;
        this.ingredient.style.top = `${this.defaultPos.top}px`;
        setTimeout(() => {
          this.object_dragged = false;
          this.ingredient.style.left = "";
          this.ingredient.style.top = "";
         this.defaultPos = this.refresh_object_pos();
        }, 300);
      }
    });
  }

  refresh_object_pos() {
    return {
      left: this.ingredient.getBoundingClientRect().left,
      top: this.ingredient.getBoundingClientRect().top,
    };
  }
}
