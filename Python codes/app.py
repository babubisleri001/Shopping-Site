import gradio as gr
import torch
from PIL import Image
import numpy as np
import cv2
from diffusers import StableDiffusionPipeline
from huggingface_hub import login



# Setup the model
device = "cuda" if torch.cuda.is_available() else "cpu"
model_id = "s3nh/artwork-arcane-stable-diffusion"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16 if device == "cuda" else torch.float32, use_auth_token=True)
pipe = pipe.to(device)

# Generate T-shirt design function
def generate_tshirt_design(text):
    prompt = f"{text}"
    image = pipe(prompt).images[0]
    return image

# Remove background from the generated design
def remove_background(design_image):
    design_np = np.array(design_image)
    gray = cv2.cvtColor(design_np, cv2.COLOR_BGR2GRAY)
    _, alpha = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY)
    b, g, r = cv2.split(design_np)
    rgba = [b, g, r, alpha]
    design_np = cv2.merge(rgba, 4)
    return design_np

# T-shirt mockup generator with Gradio interface
examples = [
    ["MyBrand"],
    ["Hello World"],
    ["Team logo"],
]

css = """
#col-container {
    margin: 0 auto;
    max-width: 520px;
}
"""

with gr.Blocks(css=css) as demo:
    with gr.Column(elem_id="col-container"):
        gr.Markdown("""
        # T-shirt Design Generator with Stable Diffusion
        """)

        with gr.Row():
            text = gr.Textbox(
                label="Text",
                placeholder="Enter text for the T-shirt design",
                visible=True,
            )

            run_button = gr.Button("Generate Design", scale=0)

        result = gr.Image(label="Design", show_label=False)

        gr.Examples(
            examples=examples,
            inputs=[text]
        )

    def generate_tshirt_mockup(text):
        # Generate T-shirt design
        design_image = generate_tshirt_design(text)

        # Remove background from design image
        design_np = remove_background(design_image)

        # Load blank T-shirt mockup template image
        mockup_template = Image.open("/content/drive/MyDrive/unnamed.jpg")

        # Convert mockup template to numpy array
        mockup_np = np.array(mockup_template)

        # Resize design image to fit mockup
        design_resized = cv2.resize(design_np, (mockup_np.shape[1] // 4, mockup_np.shape[0] // 4))  # Adjust size as needed

        # Center the design on the mockup
        y_offset = (mockup_np.shape[0] - design_resized.shape[0]) // 2
        x_offset = (mockup_np.shape[1] - design_resized.shape[1]) // 2
        y1, y2 = y_offset, y_offset + design_resized.shape[0]
        x1, x2 = x_offset, x_offset + design_resized.shape[1]

        # Blend design with mockup using alpha channel
        alpha_s = design_resized[:, :, 3] / 255.0 if design_resized.shape[2] == 4 else np.ones(design_resized.shape[:2])
        alpha_l = 1.0 - alpha_s

        for c in range(0, 3):
            mockup_np[y1:y2, x1:x2, c] = (alpha_s * design_resized[:, :, c] +
                                          alpha_l * mockup_np[y1:y2, x1:x2, c])

        # Convert back to PIL image for Gradio output
        result_image = Image.fromarray(mockup_np)

        return result_image

    run_button.click(
        fn=generate_tshirt_mockup,
        inputs=[text],
        outputs=[result]
    )

demo.queue().launch()
