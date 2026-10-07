import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const defaultLayout = (content) => {
    return `
  ${Header()}

  <main>${content}</main>
  
${Footer()}
  `;
};

export const authLayout = (content) => {
    return `
        <div class="min-h-screen bg-slate-50">
            <div class="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
                <a
                    href="/"
                    class="mx-auto mb-8 flex items-center gap-3"
                >
                    <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
                        M
                    </span>

                    <span class="text-xl font-bold text-slate-900">
                        RouterShop
                    </span>
                </a>

                ${content}
            </div>
        </div>
    `;
};
