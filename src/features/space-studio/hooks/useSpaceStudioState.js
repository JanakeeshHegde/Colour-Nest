import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ROOM_TYPES,
  WALL_COLORS,
  WALL_FINISH_TYPES,
  FLOOR_PRESETS,
  WOOD_FINISHES,
  CEILING_COLORS,
  CEILING_STYLES,
  LIGHTING_PRESETS,
  CONFIGURABLE_SURFACES,
  DEFAULT_SURFACES_STATE
} from '../../../data/roomStudioConfig';

export function useSpaceStudioState() {
  const [searchParams] = useSearchParams();

  // Initial State from URL params or defaults
  const initialRoom = searchParams.get('room') && ROOM_TYPES[searchParams.get('room')]
    ? searchParams.get('room')
    : 'LIVING';

  // Configurator Independent States
  const [roomType, setRoomType] = useState(initialRoom);
  const [surfaces, setSurfaces] = useState(() => {
    try {
      const saved = localStorage.getItem('colournest_active_room_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.surfaces && typeof parsed.surfaces === 'object') {
          return { ...DEFAULT_SURFACES_STATE, ...parsed.surfaces };
        }
      }
    } catch {
      // Fallback
    }
    return { ...DEFAULT_SURFACES_STATE };
  });

  const [selectedSurfaceId, setSelectedSurfaceId] = useState('wall-feature');
  const [activeTab, setActiveTab] = useState('WALLS'); // WALLS, FLOOR, CEILING, WOOD, LIGHTING
  const [lighting, setLighting] = useState('BALANCED'); // SOFT DAYLIGHT, BALANCED, WARM EVENING
  const [cameraPreset, setCameraPreset] = useState('FRONT'); // FRONT, CORNER, WIDE
  const [resetCameraCounter, setResetCameraCounter] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  // Undo History Stack
  const [history, setHistory] = useState([]);

  // Reset Confirmation Modal & Toast Notification
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronize active config to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'colournest_active_room_config',
        JSON.stringify({ roomType, surfaces, lighting })
      );
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [roomType, surfaces, lighting]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Push state to undo history
  const pushHistory = () => {
    setHistory((prev) => [...prev.slice(-15), JSON.parse(JSON.stringify(surfaces))]);
  };

  // Undo Last Change
  const handleUndo = () => {
    if (history.length === 0) {
      showToast('No previous changes to undo');
      return;
    }
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setSurfaces(previous);
    showToast('Reverted last material change');
  };

  // Raycast Mesh Click Handler: selects surface and opens appropriate tab
  const handleSelectSurface = (surfaceId) => {
    setSelectedSurfaceId(surfaceId);
    if (surfaceId.startsWith('wall-')) {
      setActiveTab('WALLS');
    } else if (surfaceId === 'floor-main') {
      setActiveTab('FLOOR');
    } else if (surfaceId === 'ceiling-main') {
      setActiveTab('CEILING');
    } else if (surfaceId === 'wood-panel' || surfaceId === 'cabinet-main') {
      setActiveTab('WOOD');
    }
    setIsMobilePanelOpen(true);
    const surfaceObj = CONFIGURABLE_SURFACES.find((s) => s.id === surfaceId);
    showToast(`Selected: ${surfaceObj?.name || surfaceId}`);
  };

  // 1. UPDATE WALL COLOUR (Only changes the selected surface!)
  const handleUpdateWallColor = (colorKey, customHex = null) => {
    const wallPreset = WALL_COLORS[colorKey];
    const hex = customHex || wallPreset?.hex || '#FAF8F2';
    const name = customHex ? `Custom (${customHex.toUpperCase()})` : wallPreset?.name || 'Custom Finish';
    const finish = wallPreset?.service || 'Luxury Architectural Coating';

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      [selectedSurfaceId]: {
        ...prev[selectedSurfaceId],
        colorKey: customHex ? 'custom' : colorKey,
        color: hex,
        name,
        finish
      }
    }));

    showToast(`Applied ${name} to ${CONFIGURABLE_SURFACES.find((s) => s.id === selectedSurfaceId)?.name || 'surface'}`);
  };

  // 1B. UPDATE WALL FINISH / TEXTURE TYPE
  const handleUpdateWallFinish = (finishId) => {
    const finishPreset = WALL_FINISH_TYPES[finishId];
    if (!finishPreset) return;

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      [selectedSurfaceId]: {
        ...prev[selectedSurfaceId],
        material: finishId,
        finishType: finishId,
        finish: finishPreset.name,
        roughness: finishPreset.roughness
      }
    }));
    showToast(`Finish: ${finishPreset.name}`);
  };

  // 2. UPDATE FLOOR MATERIAL
  const handleUpdateFloor = (floorKey) => {
    const preset = FLOOR_PRESETS[floorKey];
    if (!preset) return;

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      'floor-main': {
        ...prev['floor-main'],
        material: preset.materialType,
        preset: floorKey,
        color: preset.color,
        name: preset.name,
        finish: preset.service,
        roughness: preset.roughness
      }
    }));
    showToast(`Applied ${preset.name} to Floor`);
  };

  // 3. UPDATE CEILING MATERIAL & STYLE
  const handleUpdateCeilingColor = (colorKey) => {
    const preset = CEILING_COLORS[colorKey];
    if (!preset) return;

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      'ceiling-main': {
        ...prev['ceiling-main'],
        colorKey,
        color: preset.hex,
        name: preset.name,
        finish: preset.description,
        roughness: preset.roughness
      }
    }));
    showToast(`Applied ${preset.name} to Ceiling`);
  };

  const handleUpdateCeilingStyle = (styleKey) => {
    const preset = CEILING_STYLES[styleKey];
    if (!preset) return;

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      'ceiling-main': {
        ...prev['ceiling-main'],
        stylePreset: styleKey
      }
    }));
    showToast(`Ceiling style: ${preset.name}`);
  };

  // 4. UPDATE WOOD FINISH
  const handleUpdateWood = (woodKey) => {
    const preset = WOOD_FINISHES[woodKey];
    if (!preset) return;

    const targetWoodId = selectedSurfaceId === 'cabinet-main' ? 'cabinet-main' : 'wood-panel';

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      [targetWoodId]: {
        ...prev[targetWoodId],
        material: 'wood',
        preset: woodKey,
        color: preset.color,
        name: preset.name,
        finish: preset.service,
        roughness: preset.roughness
      }
    }));
    showToast(`Applied ${preset.name} to ${targetWoodId === 'cabinet-main' ? 'Credenza' : 'Timber Slats'}`);
  };

  // 5. UPDATE LIGHTING PRESET (Changes 3D lighting without modifying material values!)
  const handleSelectLighting = (modeKey) => {
    setLighting(modeKey);
    const light = LIGHTING_PRESETS[modeKey];
    showToast(`Atmosphere set to: ${light?.name || modeKey}`);
  };

  // 6. RESET SELECTED SURFACE ACTION
  const handleResetSelectedSurface = () => {
    const defaultSurface = DEFAULT_SURFACES_STATE[selectedSurfaceId];
    if (!defaultSurface) return;

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      [selectedSurfaceId]: { ...defaultSurface }
    }));
    showToast(`Reset ${CONFIGURABLE_SURFACES.find((s) => s.id === selectedSurfaceId)?.name || 'surface'} to default`);
  };

  // 7. COMPLETE RESET STUDIO ACTION
  // Restores all walls, floor, ceiling, wood finishes, lighting, camera, selections to original defaults
  const handleResetEntireRoom = () => {
    pushHistory();
    // 1. Restore all wall, floor, ceiling, wood surface materials and colors
    setSurfaces(JSON.parse(JSON.stringify(DEFAULT_SURFACES_STATE)));
    // 2. Restore default lighting (BALANCED)
    setLighting('BALANCED');
    // 3. Return camera to default FRONT perspective view
    setCameraPreset('FRONT');
    setResetCameraCounter((c) => c + 1);
    // 4. Clear temporary selections and highlights
    setSelectedSurfaceId('wall-feature');
    setActiveTab('WALLS');
    // 5. Clean local storage state
    try {
      localStorage.removeItem('colournest_active_room_config');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    // 6. Close modal & notify
    setIsResetModalOpen(false);
    showToast('Room design restored to original settings');
  };

  return {
    roomType,
    setRoomType,
    surfaces,
    setSurfaces,
    selectedSurfaceId,
    setSelectedSurfaceId,
    activeTab,
    setActiveTab,
    lighting,
    setLighting,
    cameraPreset,
    setCameraPreset,
    resetCameraCounter,
    setResetCameraCounter,
    showHotspots,
    setShowHotspots,
    isMobilePanelOpen,
    setIsMobilePanelOpen,
    history,
    isResetModalOpen,
    setIsResetModalOpen,
    toastMessage,
    showToast,
    handleUndo,
    handleSelectSurface,
    handleUpdateWallColor,
    handleUpdateWallFinish,
    handleUpdateFloor,
    handleUpdateCeilingColor,
    handleUpdateCeilingStyle,
    handleUpdateWood,
    handleSelectLighting,
    handleResetSelectedSurface,
    handleResetEntireRoom
  };
}
