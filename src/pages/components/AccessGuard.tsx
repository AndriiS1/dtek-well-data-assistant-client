import useUserEmailAccessCheck from "@/hooks/useUserEmailAccessCheck";

interface AccessGuardProps {
  children: React.ReactNode;
}

const AccessGuard = ({ children }: AccessGuardProps) => {
  const { hasAccess, isLoaded } = useUserEmailAccessCheck();

  if (!isLoaded) {
    return (
      <div className="flex mt-[30vh] items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900">
            Завантаження...
          </h1>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex mt-[30vh] items-center justify-center">
        <div className="text-center rounded-2xl bg-white p-8 shadow-md max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900">
            🚫 Немає доступу
          </h1>
          <p className="mt-3 text-gray-600">
            У вас немає дозволу переглядати цю сторінку.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Будь ласка зв'яжіться з розробниками.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AccessGuard;
