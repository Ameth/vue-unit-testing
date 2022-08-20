import { shallowMount } from "@vue/test-utils";
import QrCodeInput from "@/components/QRCodeInput";
import { createStore } from "vuex";

describe("Probando a QRCodeInput.vue", () => {
  describe("Montando el componente", () => {
    it("Renderizar el componente Input QR Code", () => {
      const wrapper = shallowMount(QrCodeInput);
      const component = wrapper.find(".hello");
      expect(component.classes()).toContain("hello");
    });
  });

  describe("Montando el componente Input QR Code con sus dependencias", () => {
    const store = createStore({
      state() {
        return { count: 1 };
      },
    });

    const wrapper = shallowMount(QrCodeInput, {
      global: {
        plugins: [store],
      },
    });

    it("Renderizar el botón de generar código QR", () => {
      const component = wrapper.find("#btn-generate");

      expect(component.text()).toBe("Generar QR");
    });

    it("Renderizar el texto del input, cambiar su valor y verificar si se guardo", () => {
      const component = wrapper.find("#txt-qr-code");

      expect(component.element.value).toBe("");
      component.setValue("www.jw.org");

      expect(wrapper.vm.qrCodeInput).toBe("www.jw.org");
    });
  });

  describe("Acciones y mocks", () => {
    describe("Dar click al botón de Generar QR", () => {
      const spySendQRCode = jest.spyOn(QrCodeInput.methods, "sendQRCode");

      const wrapper = shallowMount(QrCodeInput);

      const txtComponent = wrapper.find("#txt-qr-code");

      const text = "www.jw.org";

      txtComponent.setValue(text);

      it("Verificar si se llama la función de enviar el QR Code", async () => {
        const btnComponent = wrapper.find("#btn-generate");

        await btnComponent.trigger("click");

        expect(spySendQRCode).toHaveBeenCalledTimes(1);
        expect(wrapper.emitted()).toHaveProperty("qrCodeInput");
        expect(wrapper.emitted("qrCodeInput")).toHaveLength(1);
        expect(wrapper.emitted("qrCodeInput")[0]).toStrictEqual([text]);
      });

      it("El botón está deshabilitado cuando no hay texto", async () => {
        const wrapper = shallowMount(QrCodeInput);
        const btnComponent = wrapper.find("#btn-generate");

        expect(btnComponent.attributes().disabled).toBeDefined();
      });
    });
  });
});
