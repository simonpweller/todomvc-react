describe(`No todos`, () => {
  it(`should hide #main and #footer if there are no todos`, () => {
    cy.visit("http://localhost:3000");
    cy.get(".main").should("be.hidden");
    cy.get(".footer").should("be.hidden");
  });
});

describe(`New todo`, () => {
  it(`should focus the input element when the page is loaded`, () => {
    cy.get(".new-todo").should("have.focus");
  });

  it(`should create the todo, append it to the todo list, and clear the input when enter is pressed`, () => {
    cy.get(".new-todo").type("Learn JavaScript").type("{enter}");

    cy.get(".todo-list").find("li").should("have.length", 1);
    cy.get(".todo-list")
      .find("li")
      .first()
      .should("contain", "Learn JavaScript");
    cy.get(".new-todo").should("have.value", "");
    cy.get(".toggle").should("not.be.checked");
    cy.get("li").first().should("not.have.class", "completed");

    cy.get(".main").should("be.visible");
    cy.get(".footer").should("be.visible");
  });

  it(`should not create a todo if the text is empty after trimming`, () => {
    cy.get(".todo-list")
      .find("li")
      .then(($todos) => {
        const todoCount = $todos.length;

        cy.get(".new-todo").type("{enter}");
        cy.get(".todo-list").find("li").should("have.length", todoCount);
        cy.get(".new-todo").type("  ").type("{enter}");
        cy.get(".todo-list").find("li").should("have.length", todoCount);
      });
  });
});

describe(`Marking todos as completed`, () => {
  describe(`clicking the checkbox of an item`, () => {
    it(`should mark the todo as complete by updating its completed value and toggling the class completed on its parent <li>`, () => {
      cy.get(".toggle").click();
      cy.get(".toggle").should("be.checked");
      cy.get("li").first().should("have.class", "completed");
    });

    it(`should mark the todo as not completed when it's clicked a second time`, () => {
      cy.get(".toggle").click();
      cy.get(".toggle").should("not.be.checked");
      cy.get("li").first().should("not.have.class", "completed");
    });
  });

  describe(`clicking the mark all as complete checkbox`, () => {
    before(() => {
      cy.get(".new-todo").type("Learn React").type("{enter}");
    });

    it(`it should mark all items as completed`, () => {
      cy.get(".toggle-all").click();
      cy.get(".toggle").should("be.checked");
    });

    it(`should mark all items as not completed if they were all completed before`, () => {
      cy.get(".toggle-all").click();
      cy.get(".toggle").should("not.be.checked");
    });

    it(`should update as individual items are marked as completed`, () => {
      cy.get(".toggle-all").should("not.be.checked");
      cy.get(".toggle").first().click();
      cy.get(".toggle-all").should("not.be.checked");
      cy.get(".toggle").eq(1).click();
      cy.get(".toggle-all").should("be.checked");
    });

    describe(`when some items were marked as completed, but not others`, () => {
      before(() => {
        cy.get(".toggle").first().click();
        cy.get(".toggle-all").should("not.be.checked");
      });
      it(`should mark all items as completed`, () => {
        cy.get(".toggle-all").click();
        cy.get(".toggle").should("be.checked");
      });
    });
  });
});

describe(`counter`, () => {
  it(`should read "0 items left" if there are no active items`, () => {
    cy.get(".todo-count").contains("0 items left");
  });

  it(`should read "1 item left" if there is one active item`, () => {
    cy.get(".toggle").first().click();
    cy.get(".todo-count").contains("1 item left");
  });

  it(`should read "2 item left" if there are two active items`, () => {
    cy.get(".toggle").eq(1).click();
    cy.get(".todo-count").contains("2 items left");
  });
});

describe(`clicking remove button`, () => {
  after(() => {
    cy.get(".todo-list li").then(($li) => {
      if ($li.length === 1) {
        cy.get(".new-todo").type("Learn React").type("{enter}");
      }
    });
  });

  it(`should remove the corresponding item`, () => {
    cy.get(".todo-list").find("li").should("have.length", 2);
    cy.get(".destroy").eq(1).click({ force: true }); // unfortunately necessary https://docs.cypress.io/api/commands/hover.html#Workarounds
    cy.get(".todo-list").find("li").should("have.length", 1);
    cy.get(".todo-list").find("li").should("contain", "Learn JavaScript");
  });
});

describe(`clear completed button`, () => {
  before(() => {
    cy.get(".toggle").eq(1).click();
  });

  after(() => {
    cy.get(".todo-list li").then(($li) => {
      if ($li.length === 1) {
        cy.get(".new-todo").type("Learn React").type("{enter}");
      }
    });
  });

  it(`should remove completed todos when clicked`, () => {
    cy.get(".clear-completed").click();
    cy.get(".todo-list").find("li").should("have.length", 1);
    cy.get(".todo-list").find("li").should("contain", "Learn JavaScript");
  });

  it(`should be hidden when there are no completed todos`, () => {
    cy.get(".clear-completed").should("be.hidden");
  });
});

describe(`editing`, () => {
  describe(`double clicking the label of a todo`, () => {
    it(`should activate editing mode, saving the updated todo on blur`, () => {
      cy.get(".todo-list li").first().should("not.have.class", "editing");

      cy.get(".todo-list label").first().dblclick();
      cy.get(".todo-list li").first().should("have.class", "editing");
      cy.get(".todo-list .edit").first().should("have.focus");

      cy.get(".todo-list .edit").first().type(" properly").blur();

      cy.get(".todo-list li").first().should("not.have.class", "editing");
      cy.get(".todo-list")
        .find("li")
        .first()
        .should("contain", "Learn JavaScript properly");
    });

    it(`should activate editing mode, saving the updated todo on enter`, () => {
      cy.get(".todo-list li").eq(1).should("not.have.class", "editing");

      cy.get(".todo-list label").eq(1).dblclick();
      cy.get(".todo-list li").eq(1).should("have.class", "editing");
      cy.get(".todo-list .edit").eq(1).should("have.focus");

      cy.get(".todo-list .edit").eq(1).type(" properly").type("{enter}");

      cy.get(".todo-list li").eq(1).should("not.have.class", "editing");
      cy.get(".todo-list")
        .find("li")
        .eq(1)
        .should("contain", "Learn React properly");
    });
  });
});
