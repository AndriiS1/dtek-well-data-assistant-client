import { AssetApiService } from "@/api/services/AssetApiService";
import { searchParamsConstants } from "@/constants/searchParamsConstants";
import useUserEmailAccessCheck from "@/hooks/useUserEmailAccessCheck";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Asset, AssetWell } from "../../types/asset";
import WellOverview from "./components/WellOverview";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [assets, setAssets] = useState<Asset[]>([]);
  const selectedDeviceId = searchParams.get(searchParamsConstants.deviceId);
  const { hasAccess, isLoaded } = useUserEmailAccessCheck();

  useEffect(() => {
    const fetchData = async () => {
      const data = await AssetApiService.getAssets();
      setAssets(data);
    };

    fetchData();
  }, []);

  const handleDeviceClick = (deviceId: string) => {
    if (selectedDeviceId === deviceId) {
      setSearchParams({});
      return;
    }

    const params = {
      [searchParamsConstants.deviceId]: deviceId,
      [searchParamsConstants.from]: startOfDay(
        subDays(new Date(), 7)
      ).toISOString(),
      [searchParamsConstants.to]: endOfDay(new Date()).toISOString(),
      [searchParamsConstants.aggregationType]: "Avg",
      [searchParamsConstants.interval]: "6h",
    };

    setSearchParams(params);
  };

  const getDeviceItem = (device: AssetWell) => {
    const isSelected = selectedDeviceId === device.id;

    return (
      <li
        key={device.id}
        onClick={() => handleDeviceClick(device.id)}
        className={`
        text-sm flex justify-between p-2 rounded-md cursor-pointer transition-all
        ${
          isSelected
            ? "bg-yellow-400/10 text-yellow-600 font-medium border-r-4 border-yellow-400"
            : "text-gray-600 hover:bg-gray-100"
        }
      `}
      >
        <span>{device.name}</span>
        <span className={"text-green-500"}>●</span>
      </li>
    );
  };

  const getAssetItem = (asset: Asset) => {
    return (
      <div key={asset.id} className="group">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          {asset.name}
        </h3>

        <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-100 pl-4">
          {asset.wells.map((device) => getDeviceItem(device))}
        </ul>
      </div>
    );
  };

  const mainContent = () => {
    return (
      <div className="flex bg-gray-50">
        <aside
          className="w-80 bg-white border-r border-gray-200 p-4
                        sticky top-0 h-screen overflow-y-auto"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Асети & Пристрої
          </h2>

          <div className="space-y-6">
            {assets.map((asset) => getAssetItem(asset))}
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          {selectedDeviceId ? (
            <WellOverview deviceId={selectedDeviceId} />
          ) : (
            <h1 className="text-2xl font-light text-gray-400">
              Виберіть асет для перегляду аналітики...
            </h1>
          )}
        </main>
      </div>
    );
  };

  const noAccess = () => {
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
            Будь ласка зв'яжіться з розробниками, щоб отримати доступ.
          </p>
        </div>
      </div>
    );
  };

  const loading = () => {
    return (
      <div className="flex mt-[30vh] items-center justify-center ">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900">
            Завантаження...
          </h1>
        </div>
      </div>
    );
  };

  const assetsLoaded = assets.length > 0;

  if (!isLoaded || !assetsLoaded) {
    return loading();
  }

  return hasAccess ? mainContent() : noAccess();
};

export default HomePage;
