import { Fragment } from "react";
import { Check } from "lucide-react";
import styles from "../../styles/PostEvent.module.css";

const STEPS = [
  { n: 1, label: "Event Details" },
  { n: 2, label: "Payment" },
  { n: 3, label: "Review" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <ol className={styles.stepIndicator} aria-label="Progress">
      {STEPS.map(({ n, label }, i) => {
        const isActive = n === currentStep;
        const isComplete = n < currentStep;
        const isLast = i === STEPS.length - 1;
        const dotCls = [
          styles.stepDot,
          isActive && styles.stepDotActive,
          isComplete && styles.stepDotComplete,
        ]
          .filter(Boolean)
          .join(" ");
        const connectorCls = [
          styles.stepConnector,
          isComplete && styles.stepConnectorComplete,
        ]
          .filter(Boolean)
          .join(" ");
        const labelCls = [
          styles.stepLabel,
          isActive && styles.stepLabelActive,
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <Fragment key={n}>
            <li
              className={styles.stepItem}
              aria-current={isActive ? "step" : undefined}
            >
              <div className={dotCls}>
                {isComplete ? <Check size={14} strokeWidth={3} /> : <span>{n}</span>}
              </div>
              <div className={labelCls}>{label}</div>
            </li>
            {!isLast && <div className={connectorCls} aria-hidden="true" />}
          </Fragment>
        );
      })}
    </ol>
  );
}
