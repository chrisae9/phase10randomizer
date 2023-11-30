import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <div class="bg-gradient-to-r from-blue-600 to-blue-400 min-h-screen flex flex-col items-center justify-center">
        <div class="bg-clear rounded-lg shadow-xl p-6 max-w-md w-full">
          <div class="text-center py-4">
            <p class="text-xl text-white">:/</p>
          </div>
        </div>
        <footer class="w-full flex justify-between items-center px-6 py-4 absolute bottom-0">
          <span class="text-white text-sm">Created by <b>Chris Alves</b></span>
          <a href="https://github.com/chrisae9/" target="_blank" class="text-white flex items-center">
            <img src="/github.svg" alt="GitHub" class="h-6 mr-2" />
            <span>GitHub</span>
          </a>
        </footer>
      </div>
    </>
  );
}
