import GradientButton from "../ui/GradientButton";

const ErrorPage = ({ message, onRetry }) => (
    <div className="flex items-center justify-center min-h-[50vh] p-4">
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 sm:p-10 text-center w-full max-w-sm sm:max-w-md">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[32px] sm:text-[36px] text-red-400">error</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-700">Something went wrong</h3>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">{message}</p>
            {onRetry && (
                <div className="flex justify-center mt-5">
                    <GradientButton
                        onClick={onRetry}
                        className="!px-8 !py-2.5 !text-sm !rounded-xl !font-bold !shadow-md hover:!shadow-lg hover:!-translate-y-0.5"
                    >
                        <span className="material-symbols-outlined text-[18px]">refresh</span>
                        Try Again
                    </GradientButton>
                </div>
            )}
        </div>
    </div>
);

export default ErrorPage;