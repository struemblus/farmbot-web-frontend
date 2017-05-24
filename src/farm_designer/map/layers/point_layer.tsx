import * as React from "react";
import { TaggedGenericPointer } from "../../../resources/tagged_resources";
import { GardenPoint } from "../garden_point";

interface PointLayerProps {
  visible: boolean;
  points: TaggedGenericPointer[];
}

export function PointLayer({ visible, points }: PointLayerProps) {
  if (visible) {
    return <g>{
      points.map(p => { return <GardenPoint point={p} key={p.body.id} />; })
    }</g>;
  } else {
    return <g />;
  }
}
