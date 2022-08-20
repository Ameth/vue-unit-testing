import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("Comprobar si se renderiza el componente HelloWorld.vue", () => {
    const wrapper = shallowMount(HelloWorld);
    const component = wrapper.find(".hello");
    expect(component.classes()).toContain("hello");
    expect(wrapper.vm.counter).toBe(0);

    wrapper.vm.increment();
    expect(wrapper.vm.counter).toBe(1);
  });

  it("Dar click al botón e incrementar y renderizar el nuevo valor", async () => {
    const wrapper = shallowMount(HelloWorld);
    const component = wrapper.find("#but-increment");

    await component.trigger("click");
    expect(wrapper.find("#header-counter").text()).toBe("counter: 1");
    expect(wrapper.vm.counter).toBe(1);
  });

  it("Dar click al botón de reset y resetear el contador a 0", async () => {
    const wrapper = shallowMount(HelloWorld);
    const component = wrapper.find("#but-reset");

    await component.trigger("click");
    expect(wrapper.find("#header-counter").text()).toBe("counter: 0");
    expect(wrapper.vm.counter).toBe(0);
  });

  it("Dar click al botón de incrementar y verificar que la función fue llamada e incremento el valor en la data", async () => {
    const spyIncrement = jest.spyOn(HelloWorld.methods, "increment");
    const wrapper = shallowMount(HelloWorld);
    const component = wrapper.find("#but-increment");

    await component.trigger("click");

    expect(spyIncrement).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.counter).toBe(1);
  });

  it("Dar click al botón de incrementar usando un mock para la función", async () => {
    const mockedIncrement = jest.fn();

    const wrapper = shallowMount(HelloWorld);

    wrapper.setMethods({ increment: mockedIncrement });

    const component = wrapper.find("#but-increment");

    await component.trigger("click");

    expect(mockedIncrement).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.counter).toBe(0);
  });
});
